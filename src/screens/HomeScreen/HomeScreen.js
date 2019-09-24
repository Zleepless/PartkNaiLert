import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    ScrollView,
    Linking,
    Platform
} from "react-native";
import Banner from "./components/Banner";
import HighLight from "./components/HighLight";
import Description from "./components/Description";
import BeaconsStatus from "./components/BeaconsStatus";
import ARButton from "./components/ARButton";
import SetLanguageModal from "../../components/modals/SetLanguageModal";
import SetPageModal from "../../components/modals/SetPageModal";
import {translate} from "../../helpers/translates";
import ARModal from "../../components/modals/ARModal";
import ContentDetailModal from "../AsyncScreens/components/ContentDetailModal";
import firebase from 'react-native-firebase'
import {getParamsFromUrl} from '../../helpers/url'

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
        headerTitle: null
    };

    state = {
        isShowSetLang: false,
        isShowSetPage: false,
        isShowArScreen: false
    };

    handleHamburgerClick = () => {
        this.setState({
            isShowSetPage: true,
        })
    };

    handleLangButtonClick = () => {
        this.setState({
            isShowSetLang: true,
        })

    };

    handleARButtonClick = () => {
        const {showARModal} = this.props;
        showARModal();
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

    t = (key, find, replace) => {
        const {language} = this.props;
        return translate(language, key, find, replace);
    };

    componentDidMount() {
        const {getImageSlidersFromApi} = this.props;
        getImageSlidersFromApi();

        firebase.links()
            .getInitialLink()
            .then((url) => {
                if (url) {
                    console.log('url');
                    // app opened from a url
                    this.goToDetailPage(url);
                } else {
                    console.log('test1');
                    if (Platform.OS === 'android') {
                        Linking.getInitialURL().then(url => {
                            console.log('url', url)
                            this.goToDetailPage(url);
                        });
                    } else {
                        Linking.addEventListener('url', this.handleOpenURL);
                    }
                }
            });
    }

    componentWillUnmount() { // C
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = async (event) => {
        this.goToDetailPage(event.url);
    };

    goToDetailPage = async (url) => {
        const resUrl = await fetch(url).then(res => res.url);
        const params = getParamsFromUrl(resUrl);
        const {id} = params;
        const {navigation, setActiveHighlightItem, getHighlightListFromApi} = this.props;
        await getHighlightListFromApi();
        const itemId = parseInt(id);
        await setActiveHighlightItem(itemId);
        navigation.navigate('Detail');
    };

    render() {
        const {language, imagesHighlight, isGettingImageSlider, isInBeaconArea} = this.props;
        const {isShowSetLang, isShowSetPage, isShowArScreen} = this.state;
        const barStyle = (isShowSetLang || isShowSetPage || isShowArScreen) ? 'light-content' : 'default';
        return (
            <View style={styles.container}>
                <StatusBar barStyle={barStyle} />
                <Banner
                    language={language}
                    t={this.t}
                    onSetPageClick={this.handleHamburgerClick}
                    onSetLangClick={this.handleLangButtonClick}
                    onIntroClick={this.handleIntroClick}
                    onFindClick={this.handleGuidesClick}
                />
                <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
                    <HighLight
                        loading={isGettingImageSlider}
                        imagesHighlight={imagesHighlight}
                        t={this.t}
                        onMoreItemClick={this.handleMoreItemClick}
                    />
                    <Description t={this.t} />
                    <BeaconsStatus t={this.t} isInBeaconZone={isInBeaconArea}/>
                </ScrollView>
                <ARButton t={this.t} onPress={this.handleARButtonClick} />
                <SetPageModal
                    t={this.t}
                    visible={isShowSetPage}
                    onClose={this.handleCloseModal}
                    onChangePage={this.handleChangePage}
                />
                <SetLanguageModal
                    visible={isShowSetLang}
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
    scrollContainer: {
        flex: 1,
        width: '100%',
        paddingBottom: 20,
    },
    contentContainer: {
        alignItems: 'center'
    }
});