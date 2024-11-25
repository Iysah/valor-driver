import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { useSearchStore } from '@/store/search'
import ThemeText from '../ThemeText'
import { GLOBALSTYLES } from '@/styles/global-styles'
import ThemeButton from '../ThemeButton'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { BusIcon, CloseIcon, LuxuryCarIcon, PickupIco, SedanIcon, SuvIcon, VanIcon } from '@/assets/icons/icon'
import Constants from 'expo-constants';
import { observer } from 'mobx-react-lite'
import { useFleetStore } from '@/store/fleet'
import { responsiveHeight } from '@/utils/sizeCalculator'
import { COLORS } from '@/styles/colors'

const {width, height} = Dimensions.get('screen')
const SearchFilters:FC<any> = observer(({navigation, setOpenFilter, callBack}) => {
  const {
    setColor, setCondition, setDateavailable, setIstinted, setMake, setModel, setNumberseat, setService, setTransmission, setYof, setVtype,
    color, condition, dateavailable, istinted, make, model, numberseat, service, transmission, yof, vtype
  } = useSearchStore()
  const {selectedCarmodel, selectedCarmake, selectedCarcolor, setSelectedCarcolor, setSelectedCarmake, setSelectedCarModel, setTotalFilter, totalFilter} = useFleetStore()

  const [activeTab, setActive] = React.useState<string>("Filter")
  const [selectedSort, setSelectedSort] = React.useState("")
  const carCategory = [
    {
      title: 'SUVs',
      icon: SuvIcon
    },
    {
      title: 'Sedan',
      icon: SedanIcon
    },
    {
      title: 'Luxury',
      icon: LuxuryCarIcon
    },
    {
      title: 'Bus',
      icon: BusIcon
    },
    {
      title: 'Pickup',
      icon: PickupIco
    },
    {
      title: 'Mini van',
      icon: VanIcon
    },
  ]

  const sorts = [
    "Relevance", "Special Deals", "Recently Viewed", "Daily Price: low to high", "Daily Price: high to low", "Ratings: low to high", "Ratings: high to low"
  ]
    const Divider = () => {
        return <View style={{width: '100%', height: 1, backgroundColor: "#FFECEB"}}/>
    }
    const RowRendering = ({children}:{ children: React.ReactNode }) => {
        return <View style={[GLOBALSTYLES.row, {justifyContent: 'space-between', paddingVertical: responsiveHeight(15)}]}>{children}</View>
    }
    const years = Array.from({ length: 2024 - 1990 + 1 }, (_, i) => 1990 + i);
    const numbers = Array.from({ length: 150 }, (_, i) => i + 1);
    const clearFilter = () => {
      setColor("")
      setCondition("")
      setDateavailable("")
      setIstinted("")
      setMake("")
      setModel("")
      setNumberseat("")
      setService("")
      setTransmission("")
      setVtype("")
      setYof("")
      setSelectedCarModel("")
      setSelectedCarcolor("")
      setSelectedCarmake({})
      setTotalFilter(0)
    }
  return (
    <View style={[styles.filterView]}>
      <View style={[GLOBALSTYLES.row]}>
          <Pressable onPress={() => setActive("Filter")} style={[styles.tab, GLOBALSTYLES.row, GLOBALSTYLES.center, {borderBottomWidth: activeTab == "Filter" ? 2 : 1, borderColor: activeTab == "Filter" ? "#023047" : "#D8D8D8"}]}><ThemeText type={activeTab == "Filter" ? "header" : "secondaryNormalText"} style={{fontSize: 14}}>Filters</ThemeText><View style={[styles.counter, GLOBALSTYLES.center]}><ThemeText type='primaryNormalText' style={styles.counterText}>{totalFilter}</ThemeText></View></Pressable>
          <Pressable onPress={() => setActive("Sort")} style={[styles.tab, GLOBALSTYLES.row, GLOBALSTYLES.center, {borderBottomWidth: activeTab == "Sort" ? 2 : 1, borderColor: activeTab == "Sort" ? "#023047" : "#D8D8D8"}]}><ThemeText type={activeTab == "Sort" ? "header" : "secondaryNormalText"} style={{fontSize: 14}}>Sort</ThemeText></Pressable>
      </View>
      {
        activeTab == "Filter" && (
          <>
            <ScrollView style={[GLOBALSTYLES.wrapper]} showsVerticalScrollIndicator={false}>
                <View style={{marginVertical: 30}}>
                  <ThemeText type='header' style={{fontSize: 14}}>Price</ThemeText>
                  <View style={[GLOBALSTYLES.row, {gap: 12, marginTop: 10}]}>
                      <View style={[GLOBALSTYLES.row, styles.priceInput, GLOBALSTYLES.center]}><ThemeText>N</ThemeText><TextInput placeholder='Min' /></View>
                      <View style={[GLOBALSTYLES.row, styles.priceInput, GLOBALSTYLES.center]}><ThemeText>N</ThemeText><TextInput placeholder='Max' /></View>
                  </View>
                </View>
                <Divider />
                <View style={{marginVertical: responsiveHeight(30)}}>
                  <ThemeText type='header' style={{fontSize: 14}}>Vehicle type</ThemeText>
                  <View style={[GLOBALSTYLES.row, {gap: 10, flexWrap: "wrap", marginTop: 25}]}>
                      {
                        carCategory?.map((car, idx) => {
                            const IconComponent = car.icon
                        return (
                        <Pressable key={idx} onPress={() => setVtype(car.title)} style={[GLOBALSTYLES.column, GLOBALSTYLES.center, styles.iconCard, {width: (width-60)/3, height: (width-60)/4, borderColor: vtype == car.title ? "#000" : "#D8D8D8", borderWidth: vtype==car.title ? 2 : 1}]}>
                            <IconComponent />
                            <ThemeText type='primaryNormalText'>{car.title}</ThemeText>
                        </Pressable>
                        )})
                      }
                  </View>
                </View>
                <Divider />
                <View style={{marginTop: responsiveHeight(30)}}>
                  <ThemeText type='header' style={{fontSize: 14}}>Vehicle attributes</ThemeText>
                  <View>
                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Make</ThemeText>
                        <TouchableOpacity onPress={() => navigation.navigate("carmake-search")}>
                          <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{selectedCarmake?.make ? selectedCarmake?.make : "All makes"}</ThemeText>
                        </TouchableOpacity>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Model</ThemeText>
                        <TouchableOpacity onPress={() => navigation.navigate("carmodel-search")}>
                          <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{selectedCarmodel?.model ? selectedCarmodel?.model : "All models"}</ThemeText>
                        </TouchableOpacity>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Transmission</ThemeText>
                        <Menu>
                            <MenuTrigger>
                              <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{transmission ? transmission : "All transmissions"}</ThemeText>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={[styles.dropmenu, {borderRadius: 6}]}>
                              <FlatList
                                  data={["Automatic", "Manual"]}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                    <MenuOption style={{paddingHorizontal: 14, paddingVertical: responsiveHeight(10), borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => {
                                      setTransmission(item)
                                      setTotalFilter(totalFilter+1)
                                    }} >
                                        <ThemeText type='primaryNormalText' style={styles.inputText}>{item}</ThemeText>
                                    </MenuOption>
                                  )}
                              />
                            </MenuOptions>
                        </Menu>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Year of manufacturing</ThemeText>
                        <Menu>
                            <MenuTrigger>
                              <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{yof ? yof : "All Years"}</ThemeText>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={[styles.dropmenu, {borderRadius: 6}]}>
                              <FlatList
                                  data={[...years]}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                    <MenuOption style={{paddingHorizontal: 14, paddingVertical: responsiveHeight(10), borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => {
                                      setYof(item)
                                      setTotalFilter(totalFilter+1)
                                      }} >
                                        <ThemeText type='primaryNormalText' style={styles.inputText}>{item}</ThemeText>
                                    </MenuOption>
                                  )}
                              />
                            </MenuOptions>
                        </Menu>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Service</ThemeText>
                        <Menu>
                            <MenuTrigger>
                              <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{service ? service : "All services"}</ThemeText>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={[styles.dropmenu, {borderRadius: 6}]}>
                              <FlatList
                                  data={["Full day", "Airport pick-up", "Airport drop-off", "Overnight"]}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                    <MenuOption style={{paddingHorizontal: 14, paddingVertical: (responsiveHeight(10)), borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => {
                                      setService(item)
                                      setTotalFilter(totalFilter+1)
                                      }} >
                                        <ThemeText type='primaryNormalText' style={styles.inputText}>{item}</ThemeText>
                                    </MenuOption>
                                  )}
                              />
                            </MenuOptions>
                        </Menu>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Vehicle glass</ThemeText>
                        <Menu>
                            <MenuTrigger>
                              <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{istinted ? istinted : "Tinted"}</ThemeText>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={[styles.dropmenu, {borderRadius: 6}]}>
                              <FlatList
                                  data={["Yes", "No"]}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                    <MenuOption style={{paddingHorizontal: 14, paddingVertical: responsiveHeight(10), borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => {
                                      setIstinted(item)
                                      setTotalFilter(totalFilter+1)
                                    }} >
                                        <ThemeText type='primaryNormalText' style={styles.inputText}>{item}</ThemeText>
                                    </MenuOption>
                                  )}
                              />
                            </MenuOptions>
                        </Menu>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Upgraded</ThemeText>
                        <Menu>
                            <MenuTrigger>
                              <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{condition ? condition : "All"}</ThemeText>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={[styles.dropmenu, {borderRadius: 6}]}>
                              <FlatList
                                  data={["Yes", "No"]}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                    <MenuOption style={{paddingHorizontal: 14, paddingVertical: responsiveHeight(10), borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => {
                                      setCondition(item)
                                      setTotalFilter(totalFilter+1)
                                    }} >
                                        <ThemeText type='primaryNormalText' style={styles.inputText}>{item}</ThemeText>
                                    </MenuOption>
                                  )}
                              />
                            </MenuOptions>
                        </Menu>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Vehicle color</ThemeText>
                        <TouchableOpacity onPress={() => navigation.navigate("carcolors-search")}>
                          <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{selectedCarcolor ? selectedCarcolor : "All"}</ThemeText>
                        </TouchableOpacity>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Number of seats</ThemeText>
                        <Menu>
                            <MenuTrigger>
                              <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>{numberseat ? numberseat : "All seats"}</ThemeText>
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={[styles.dropmenu, {borderRadius: 6}]}>
                              <FlatList
                                  data={[...numbers]}
                                  showsVerticalScrollIndicator={false}
                                  renderItem={({item}) => (
                                    <MenuOption style={{paddingHorizontal: 14, paddingVertical: responsiveHeight(10), borderBottomWidth: 0.5, borderBottomColor: '#E2E4E5'}} onSelect={() => {
                                      setNumberseat(item)
                                      setTotalFilter(totalFilter+1)
                                    }} >
                                        <ThemeText type='primaryNormalText' style={styles.inputText}>{item}</ThemeText>
                                    </MenuOption>
                                  )}
                              />
                            </MenuOptions>
                        </Menu>
                      </RowRendering>

                      <RowRendering>
                        <ThemeText type='secondaryNormalText'>Available date</ThemeText>
                        <ThemeText type='header' style={{color: "#023047", fontSize: 14}}>All dates</ThemeText>
                      </RowRendering>
                  </View>
                </View>
            </ScrollView>
            <View style={[GLOBALSTYLES.row, {paddingHorizontal: 16, paddingBottom: responsiveHeight(30), gap: 10}]}>
              <View style={{flex: 1}}>
                <ThemeButton onPress={clearFilter} type='OUTLINED'>Clear filters</ThemeButton>
              </View>
              <View style={{flex: 1}}>
                <ThemeButton onPress={callBack} type='GRADIENT'>Apply filters</ThemeButton>
              </View>
            </View>
          </>
        )
      }
      {
        activeTab == "Sort" && (
          <View style={[GLOBALSTYLES.wrapper, {marginTop: 45}]}>
            {
              sorts?.map((sort, idx) => (
                <Pressable onPress={() => setSelectedSort(sort)} key={idx} style={[GLOBALSTYLES.row, {gap: 24, marginBottom: 28}]}>
                  <View style={[styles.radioWrapper, GLOBALSTYLES.center]}>{sort == selectedSort && <View style={[styles.radioDots]}/>}</View>
                  <ThemeText type='primaryNormalText'>{sort}</ThemeText>
                </Pressable>
              ))
            }
          </View>
        )
      }
    </View>
  )
})

export default SearchFilters

const styles = StyleSheet.create({
  radioDots: {
    width: 16,
    height: 16,
    borderRadius: 20,
    backgroundColor: COLORS.light.primary
  },
  radioWrapper: {
    width: 26,
    height: 26,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.light.primary
  },
  counter: {
    width: 20, 
    height: 20,
    borderRadius: 12,
    backgroundColor: '#FF8B00',
    marginRight: 3,
    marginLeft: 3
  },
  counterText: {
      fontSize: 12,
      color: '#FFF'
  },
  filterView: {
    width,
    height: height - (Constants.statusBarHeight + 20),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    // paddingTop: Constants.statusBarHeight + 20
  },
  priceInput: {
    minWidth: 120,
    height: responsiveHeight(50),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8D8D8'
  },
  tab: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    height: responsiveHeight(45)
  },
  dropmenu: {
    position: 'absolute', 
    backgroundColor: '#fff', 
    width: '75%', 
    maxHeight: '50%',
    top: responsiveHeight(40), 
    right: 10, 
    borderRadius: 12,
    marginTop: responsiveHeight(40),
    paddingVertical: 10,
    shadowColor: 'rgba(0,0,0,0.5)', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    transform: 'translate(x: 0px, y: -100px )',
    zIndex: 1000
  },
  iconCard: {
    height: responsiveHeight(80),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    width: (width-68)/4
  },
  inputWrapper: {
    width: '100%',
    height: responsiveHeight(56),
    borderRadius: 30,
    backgroundColor:'#F4F4F4',
    paddingHorizontal: 10,
    gap: 10,
    marginBottom: responsiveHeight(25),
    marginTop: responsiveHeight(35)
  },
  inputField: {
  flex: 1,
  height: '100%',
  },
  inputText: {
    textTransform: 'capitalize',
    fontSize: 12
  },
})