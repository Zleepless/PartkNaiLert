import URLS from './../../config/urls'
import {postApiData} from "../../helpers/networking";
import {
    transformIntroData,
    transferContactData
} from '../../adapter/aboutUs'

export const GETTING_ABOUT_US_INTRO_START = 'GETTING_ABOUT_US_INTRO_START';
export const GETTING_ABOUT_US_INTRO_SUCCESS = 'GETTING_ABOUT_US_INTRO_SUCCESS';
export const GETTING_ABOUT_US_INTRO_FAILED = 'GETTING_ABOUT_US_INTRO_FAILED';
export const GETTING_ABOUT_US_CONTACT_START = 'GETTING_ABOUT_US_CONTACT_START';
export const GETTING_ABOUT_US_CONTACT_SUCCESS = 'GETTING_ABOUT_US_CONTACT_SUCCESS';
export const GETTING_ABOUT_US_CONTACT_FAILED = 'GETTING_ABOUT_US_CONTACT_FAILED';

export const getAboutUsIntroFromApi = () => async (dispatch, getState) => {
    try {
        dispatch({type: GETTING_ABOUT_US_INTRO_START});
        const url = URLS.aboutUs.intro;
        const {language} = getState().setting;
        const postData = {
            code: language,
        };
        const response = await postApiData(url, postData);
        const {response: introDataArr = []} = response.data;
        const [introData={}] = introDataArr;
        const data = transformIntroData(introData);
        dispatch({type: GETTING_ABOUT_US_INTRO_SUCCESS, data});
    } catch (e) {
        console.log(e.message);
        dispatch({type: GETTING_ABOUT_US_INTRO_FAILED});
    }
};

export const getAboutUsContactFromApi = () => async (dispatch, getState) => {
    try {
        dispatch({type: GETTING_ABOUT_US_CONTACT_START});
        const url = URLS.aboutUs.contact;
        const {language} = getState().setting;
        const postData = {
            code: language,
        };
        const response = await postApiData(url, postData);
        const {response: contactDataArr = []} = response.data;
        const [contactData={}] = contactDataArr;
        const data = transferContactData(contactData);
        dispatch({type: GETTING_ABOUT_US_CONTACT_SUCCESS, data});
    } catch (e) {
        console.log(e.message);
        dispatch({type: GETTING_ABOUT_US_CONTACT_FAILED});
    }
};


