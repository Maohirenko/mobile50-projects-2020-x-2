import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: '',
      page:1,
      refreshing:false,
    };
  }
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
       this.ApiSearch();
      }
    );
  };

  nextPage = () => {    
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.ApiSearch();
        }
      ); 
  };
  ApiSearch = () => {
    if(this.state.query.length>2){
    fetch(`http://www.omdbapi.com/?apikey=fd55716c&s=${this.state.query}&page=${this.state.page}`)
    .then(response=>response.json())
    .then(res=>{this.setState({  data: this.state.page === 1 ? res.Search : [...this.state.data, ...res.Search],  refreshing:false})})
    }
    if(this.state.query.length<3){
      this.setState({data:""})
    }
  };
componentDidUpdate(){
 // console.log(this.state.data)
}
  searchFilterFunction = text => {
  this.setState({ query: text, page: 1 },this.ApiSearch);
  };
  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={this.searchFilterFunction}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <TouchableOpacity  style={styles.mov}
              onPress={() =>
                this.props.navigation.navigate('Movie', { name: item.Title, movie:item})
              }>
              <ListItem
                titleStyle={{ fontWeight: 'bold' }}
                title={`${item.Title}`}
                subtitle={` ${item.Year}  (${item.Type})`}
                leftAvatar={{ rounded: false, source: { uri: item.Poster } }}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            </TouchableOpacity>
          )}
          onEndReached={this.nextPage}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    margin: 5,
    borderWidth: 2,
    height: 40,
    borderColor: "grey",
    borderBottomColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
  },
  mov:{
    borderBottomWidth:1,
  }
});
export default Search;
