import {getHighlightItemFromApi, setActiveHighlightItem} from "../../reducers/actions/contents";
import {connect} from "react-redux";
import ContentListScreen from "./ContentListScreen";


const mapDispatchToProps = (dispatch) => {
    return {
        getHighlightItemFromApi: () => dispatch(getHighlightItemFromApi()),
        setActiveHighlightItem: (itemID) => dispatch(setActiveHighlightItem(itemID)),
    }
};

const mapStateToProps = (state) => {
    return {
        language: state.setting.language,
        highlightList: state.contents.highlightList,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentListScreen)