import React, { Component } from 'react';
import { FlatList } from 'react-native';
import NewsData from './NewsData.json';
import NewsItems from './NewsItems';

export default class NewsLetterScreen extends Component {
	
    constructor(props){
        super(props)
        this.state={
            news:NewsData,
            refreshing: false
        }
    }

	handleRefresh = () => {
        var self = this;
        this.setState({ refreshing: true });
        setTimeout(function(){  self.setState({ refreshing: false }); }, 3000);
	};

	render() {
		return (
			<FlatList
				data={this.state.news.articles}
				renderItem={({ item }) => <NewsItems data={item} />}
				keyExtractor={item => item.url}
				refreshing={this.state.refreshing}
				onRefresh={this.handleRefresh}
			/>
		);
	}
}