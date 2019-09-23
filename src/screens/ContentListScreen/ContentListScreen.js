import React, {Component} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Text
} from "react-native";
import ContentItem from "./components/ContentItem";
import ARButton from "./components/ARButton";
import BeaconStatusIcon from "../../components/BeaconStatusIcon";
import HeaderLogo from "../../components/HeaderLogo";
import {translate} from "../../helpers/translates";
import ContentListLoading from "./components/loading/ContentListLoading";

class ContentListScreen extends Component {

    static navigationOptions = {
        headerTitle: <HeaderLogo />,
        headerRight: <BeaconStatusIcon />,
        headerBackTitle: null,
        headerTintColor: 'rgb(125, 105 , 87)'
    };

    handleARButtonClick = () => {
        const {showARModal} = this.props;
        showARModal();
    };

    handleItemShowMoreClick = async (id) => {
        const {navigation, setActiveHighlightItem} = this.props;
        await setActiveHighlightItem(id);
        navigation.navigate('Detail');
    };

    t = (key, find, replace) => {
        const {language} = this.props;
        return translate(language, key, find, replace);
    };

    componentDidMount() {
        const {getHighlightItemFromApi} = this.props;
        getHighlightItemFromApi();
    }

    renderItem = ({item}) => {
        return (
            <ContentItem {...item} t={this.t} onSeeMoreClick={this.handleItemShowMoreClick} />
        )
    };

    render() {
        const {highlightList, isGettingHighlightList, isGettingHighlightListSuccess} = this.props;
        return (
            <View style={styles.container}>
                {isGettingHighlightList && <ContentListLoading/>}
                {isGettingHighlightListSuccess && <FlatList
                    style={styles.flatList}
                    data={highlightList}
                    renderItem={this.renderItem}
                    contentContainerStyle={styles.flatContent}
                />}
                <ARButton t={this.t} onPress={this.handleARButtonClick}/>
            </View>
        )
    }
}

export default ContentListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: '5%'
    },
    flatList: {
        flex: 1
    },
    flatContent: {
        paddingBottom: 10,
    }
});