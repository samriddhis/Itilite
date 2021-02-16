import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class NewsItems extends Component {
    constructor(props){
        super(props)
        this.state={
            newsDetails:this.props.data
        }
    }
	render() {
		const time = moment(this.state.newsDetails.publishedAt || moment.now()).fromNow();

		return (
			<TouchableHighlight>
				<Card
					featuredTitle={this.state.newsDetails.title}
					featuredTitleStyle={{
						marginHorizontal: 5,
						textShadowColor: '#00000f',
						textShadowOffset: { width: 3, height: 3 },
						textShadowRadius: 3
					}}
					image={{
						uri:
                        this.state.newsDetails.urlToImage
					}}
				>
					<Text style={{ marginBottom: 10 }}>
						{this.state.newsDetails.description || 'Read more...'}
					</Text>
					<Divider style={{ backgroundColor: '#dfe6e9' }} />
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<Text
							style={{
								margin: 5,
								fontStyle: 'italic',
								color: '#b2bec3',
								fontSize: 10
							}}
						>
							{this.state.newsDetails.source.name.toUpperCase()}
						</Text>
						<Text
							style={{
								margin: 5,
								fontStyle: 'italic',
								color: '#b2bec3',
								fontSize: 10
							}}
						>
							{time}
						</Text>
					</View>
				</Card>
			</TouchableHighlight>
		);
	}
}
