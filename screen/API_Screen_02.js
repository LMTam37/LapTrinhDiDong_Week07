// import { View, Text, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'

// const API_Screen_02 = () => {
//     const [shop, setShop] = useState([])
//     useEffect(() => {
//         function fetchApi() {
//             fetch("https://654099fc45bedb25bfc2266a.mockapi.io/shop")
//                 .then((response) => response.json())
//                 .then((json) => {
//                     setShop(json)
//                 })
//         }
//         fetchApi();
//     }, [])
//     console.log(shop);

//     return (

//         <View style={{ flex: 1, alignItems: 'center', gap: 19, backgroundColor: '#F3F4F6' }}>
//             {shop.map(item =>
//                 <View>
//                     <Image source={{ uri: item.image }} style={{ width: 347, height: 114 }} />
//                     <View style={{ backgroundColor: "#fff", borderRadius: 6, paddingHorizontal: 4, paddingVertical: 6 }}>
//                         <View>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                                 {item.status === true &&
//                                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//                                         <Image source={require('../assets/Image 178.png')} style={{ width: 15, height: 10 }} />
//                                         <Text style={{ color: '#1DD75B' }}>Accepting Orders</Text>
//                                     </View>}

//                                 {item.status === false &&
//                                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//                                         <Image source={require('../assets/Image 190.png')} style={{ width: 15, height: 15 }} />
//                                         <Text style={{ color: '#DE3B40' }}>Tempory Unavailable</Text>
//                                     </View>}

//                                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//                                     <Image source={require('../assets/Image 180.png')} style={{ width: 15, height: 15 }} />
//                                     <Text style={{ color: '#DE3B40' }}>{item.minFarTime} - {item.maxFarTime} minutes</Text>
//                                 </View>
//                                 <View style={{ flexDirection: 'row' }}>
//                                     <Image source={require('../assets/Image 181.png')} style={{ width: 14, height: 18 }} />
//                                 </View>
//                             </View>
//                         </View>
//                         <Text style={{ fontWeight: 700 }}>{item.name}</Text>
//                         <Text style={{ opacity: 0.62 }}>{item.address}</Text>
//                     </View>
//                 </View>
//             )}
//         </View>
//     )
// }

// export default API_Screen_02