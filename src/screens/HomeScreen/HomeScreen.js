import React, {Component} from 'react'
import {
    StyleSheet,
    View,
} from "react-native";
import Banner from "./components/Banner";
import HighLight from "./components/HighLight";
import Description from "./components/Description";
import BeaconsStatus from "./components/BeaconsStatus";
import ARButton from "./components/ARButton";
import SetLanguageScreen from "./screens/SetLanguageScreen";
import SetPageScreen from "./screens/SetPageScreen";

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTitle: null
    };

    state = {
        isShowSetLang: false,
        isShowSetPage: false,
    };

    handleHamburgerClick = () => {
        this.setState({
            isShowSetLang: true,
        })
    };

    handleLangButtonClick = () => {
        this.setState({
            isShowSetPage: true,
        })
    };

    handleMoreItemClick = () => {
        const {navigation} = this.props;
        navigation.navigate('List');
    };

    handleChangePage = (page) => {
        this.handleCloseModal();
        const {navigation} = this.props;
        navigation.navigate(page);
    };

    handleChangeLang = (lang) => {
        const {settingLanguage} = this.props;
        settingLanguage(lang);
        this.handleCloseModal();
    };

    handleIntroClick = () => {
        const {navigation} = this.props;
        navigation.navigate('Intro');
    };

    handleGuidesClick = () => {
        const {navigation} = this.props;
        navigation.navigate('Find');
    };

    handleCloseModal = () => {
        this.setState({
            isShowSetPage: false,
            isShowSetLang: false,
        })
    };

    componentDidMount() {
        const {getImageSlidersFromApi} = this.props;
        getImageSlidersFromApi();
    }

    render() {
        const {language, imagesHighlight} = this.props;
        const {isShowSetLang, isShowSetPage} = this.state;
        return (
            <View style={styles.container}>
                <Banner
                    language={language}
                    onSetPageClick={this.handleHamburgerClick}
                    onSetLangClick={this.handleLangButtonClick}
                    onIntroClick={this.handleIntroClick}
                    onFindClick={this.handleGuidesClick}
                />
                <HighLight imagesHighlight={imagesHighlight} onMoreItemClick={this.handleMoreItemClick} />
                <Description />
                <BeaconsStatus />
                <ARButton />
                <SetPageScreen
                    visible={isShowSetLang}
                    onClose={this.handleCloseModal}
                    onChangePage={this.handleChangePage}
                />
                <SetLanguageScreen
                    visible={isShowSetPage}
                    activeLang={language}
                    onClose={this.handleCloseModal}
                    onChangeLang={this.handleChangeLang}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'relative',
    },
});