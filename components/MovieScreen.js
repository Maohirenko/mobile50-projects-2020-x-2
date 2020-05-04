import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, Button } from 'react-native';
const invalidInfo="Інформація поки недоступна";
function Movie({ navigation, route }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
    plot: {
      fontStyle: 'italic',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    year: {
      fontStyle:"italic",
      fontWeight:"600",
 alignSelf:"flex-end",
 marginRight:20,
      paddingBottom: 3,
    },
    img: {
      height: 500,
      width: "100%"
    },
    marginVertical: {
      marginTop: 5,
      marginBottom: 5,
      borderRadius:10,
    },
  })
 const url=`http://www.omdbapi.com/?apikey=fd55716c&i=${route.params.movie.imdbID}`;
 const fetchData = async (url) => {
  const response = await fetch(url);
  const fetchedData = await response.json();
  return fetchedData;
};
 const [data, setData] = useState(null);
 useEffect(()=>{fetchData(url).then(res => setData(res))},[]);

  const colorRate = (item) => {
if(isExist()){
    if (item > 75) {
      return "green"
    }
    else if (item > 60) {
      return "yellow"
    } else {
      return "red"
    }
  }
  else{
    return "grey"
  }
}
  const isExist=()=>{
    if(route.params.movie.Title===data.Title){
return true
    }
    else{
      return false
    }
  }
  return (data===null?<ActivityIndicator size="large" />:
  <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={[styles.img, styles.marginVertical]} source={{ uri: isExist()?data.Poster:route.params.movie.Poster }} />
        <Text style={[styles.title, styles.marginVertical]}>{isExist()?data.Title:route.params.movie.Title}</Text>
        <Text style={[styles.year]}>{isExist()?data.Year:route.params.movie.Year}</Text>
        <Text style={[styles.marginVertical]}>{isExist()?data.Rated:invalidInfo},{isExist()?data.Runtime:invalidInfo}</Text>
        <Text style={[styles.plot, styles.marginVertical]}>{isExist()?data.Plot:invalidInfo}</Text>
        <Text style={[styles.marginVertical]}>{data.Ratings[0].Source} ({isExist()?data.Ratings[0].Value:invalidInfo})</Text>
        <View style={[{ width: isExist()?parseFloat(data.Ratings[0].Value) * 10 + "%":"100%", backgroundColor: colorRate(parseFloat(data.Ratings[0].Value) * 10), height: 30 }, styles.marginVertical]}/>
        <Text style={[styles.marginVertical]}>{data.Ratings[1].Source} ({isExist()?data.Ratings[1].Value:invalidInfo})</Text>
        <View style={[{ width: isExist()?data.Ratings[1].Value:"100%", backgroundColor: colorRate(parseFloat(data.Ratings[1].Value)), height: 30 }, styles.marginVertical]}/>
        <Text style={[styles.marginVertical]}>{data.Ratings[2].Source} ({isExist()?data.Ratings[2].Value:invalidInfo})</Text>
        <View style={[{ width: isExist()?parseFloat(data.Ratings[2].Value) + "%":"100%", backgroundColor: colorRate(parseFloat(data.Ratings[2].Value)), height: 30 }, styles.marginVertical]}/>   
      </ScrollView>
      </SafeAreaView>
  );
      }
export default Movie;