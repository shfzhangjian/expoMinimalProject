import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import {getNewsById} from "../api/newsApi";
import { WebView } from 'react-native-webview';

/**
 * 新闻详情页面
 */
export default class NewsDetailView extends React.Component{
    state = {
        // 接收父路由参数
        news: this.props.navigation.state.params
    }

    constructor(props){
        super(props);
    }

   async componentWillMount(): void {
       await this.getNews();
   }

    /**
     * 查询某条新闻
     * @returns {Promise<void>}
     */
    async getNews(){
        let resp = await getNewsById(this.state.news);
        let news = resp.data.data;
        this.setState({
            news: news
        });
    }

    render(){
        // 使用es6的模板字符串语法进行字符串和变量的拼接
        let html = `
        <h1 style="text-align: center">${this.state.news.title}</h1>
        <div>
            <span>${this.state.news.author}          </span>
            <span>${this.state.news.publishTime}</span>
        </div>
        <div>${this.state.news.content}</div>
        `;

        return (
            <View style={styles.container}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: html }}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
