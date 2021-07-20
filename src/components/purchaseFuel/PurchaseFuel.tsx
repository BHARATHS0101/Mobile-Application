import React, {useState} from "react";
import _ from 'lodash';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import FuelDetails from "./FuelDetails";
import CommonFuelType from "@components/commonFuelType";
import CommonButton from "@components/commonButton";
import CommonInput from "@components/commonInput";
import CommonPopup from "@components/commonPopup/CommonPopup";
import actionCreators from '@redux/actionCreators/fuelStations';

import Styles from './PurchaseFuel.styles';

const PurchaseFuel = () => {
    
    const state = useSelector((
        state: ReduxNS.IState,
    )=> state.FuelStations);

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const selectedFuelStation:FuelStationsNS.IState['selectedFuelStation'] = state.selectedFuelStation;

    const [selectedFuel, setSelectedFuel] = useState<FuelStationsNS.FuelType>('Petrol');
    const [quantity, setQuantity] = useState('');

    const getBackGroundColor = (fuelType: FuelStationsNS.FuelType) => {
        if(fuelType === selectedFuel){
            return Styles.selectedBackGround;
        }else {
            return Styles.unSelectedBackground;
        }
    };

    const dispatchSetFetchError = (error:boolean) => {
        dispatch(actionCreators.setError(error, null));
    };

    const selectedFuelType = _.filter(selectedFuelStation?.fuelDetails, {'fuel': selectedFuel})[0];

    const totalCost = quantity!==''?String(selectedFuelType.price*(parseInt(quantity))):'';

    const buttonDisability = (quantity === ''); 

    if(selectedFuelStation!==null){
        return(
            <View style={Styles.mainContainer}>
                <CommonPopup
                    popupType={'error'}
                    message={state.errorMessage!==null?(state.errorMessage
                        ):(
                            'Something went wrong, please try again'
                    )}
                    isPopupOpen={state.isFetchError}
                    popupModalOpen={dispatchSetFetchError}
                />
                <FuelDetails
                    fuelDetails={selectedFuelStation.fuelDetails}
                    fuelStationName={selectedFuelStation.name}
                />
                <View style={Styles.viewFlexRowSpaceEven}>
                    <TouchableOpacity
                        style={[Styles.viewFlexRow, getBackGroundColor('Petrol')]}
                        onPress={() => setSelectedFuel('Petrol')}
                        activeOpacity={0.9}
                    >
                        <CommonFuelType fuelType={'Petrol'}/>
                        <Text style={[Styles.fuelType, {color: getBackGroundColor('Petrol').color}]}>{'Petrol'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[Styles.viewFlexRow, getBackGroundColor('Diesel')]}
                        onPress={() => setSelectedFuel('Diesel')}
                        activeOpacity={0.9}
                    >
                        <CommonFuelType fuelType={'Diesel'}/>
                        <Text style={[Styles.fuelType, {color: getBackGroundColor('Diesel').color}]}>{'Diesel'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[Styles.viewFlexRow, getBackGroundColor('CNG')]}
                        onPress={() => setSelectedFuel('CNG')}
                        activeOpacity={0.9}
                    >
                        <CommonFuelType fuelType={'CNG'}/>
                        <Text style={[Styles.fuelType, {color: getBackGroundColor('CNG').color}]}>{'CNG'}</Text>
                    </TouchableOpacity>
                </View>
                <CommonInput
                    inputTypeToValidate={'Number'}
                    keyboardType= {'number-pad'}
                    inputValue={quantity}
                    onChangeInputValue={setQuantity}
                    placeHolder={'Enter Quantity in litres'}
                    customStyle={Styles.input}
                />
                <CommonButton
                    disabled={buttonDisability}
                    onClick={() => dispatch(actionCreators.purchaseFuel(
                        selectedFuelStation.name,
                        selectedFuel,
                        quantity,
                        totalCost,
                        navigation,
                    ))}
                    name={`Pay ${totalCost}`}
                    buttonStyle={Styles.button}
                    isLoading={state.isLoading}
                />
            </View>
        )
    }else {
        return(
            <ActivityIndicator
                size={'large'}
                style={Styles.activityIndicator}
                color={Styles.activityIndicator.color}
            />
        );
    }
};

export default PurchaseFuel;