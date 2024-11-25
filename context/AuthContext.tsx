import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  getUserToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'RESTORE_TOKEN'; payload: AuthState };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'RESTORE_TOKEN':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Load user token from AsyncStorage
    // const loadUserToken = async () => {
    //   const token = await AsyncStorage.getItem('userToken');
    //   setUserToken(token); 
    // };
    // loadUserToken();
    // Load stored authentication state
    const loadStoredAuth = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem('auth');
        if (storedAuth) {
          dispatch({ 
            type: 'RESTORE_TOKEN', 
            payload: JSON.parse(storedAuth) 
          });
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      }
    };

    loadStoredAuth();
  }, []);

  const getUserToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
            return token;
        } else {
            console.warn('No token found');
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
};

  const login = async (userData: User) => {
    try {
      const authState = {
        user: userData,
        isAuthenticated: true,
        token: null, // Add token if available
      };
      
      // Store authentication state
      await AsyncStorage.setItem('auth', JSON.stringify(authState));
      
      dispatch({ type: 'LOGIN', payload: userData });
    } catch (error) {
      console.error('Error storing auth state:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error removing auth state:', error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ ...state, login, logout, getUserToken: async (): Promise<string | null> => {
      const token = await getUserToken();
      return token ?? null;
    }}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 