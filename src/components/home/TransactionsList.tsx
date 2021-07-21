import React from "react";
import {View, Text, FlatList, ScrollView} from 'react-native';
import _ from 'lodash';

import EmptyData from "@components/emptyData";
import CommonFuelType from "@components/commonFuelType";

import Styles from './Home.styles';

const TransactionsList = (props: ProfileNS.ITransactionsListProps) => {

    const gasTransactions = _.reverse(props.gasTransactions);

    return (
        <View style={Styles.bottomContainer}>
            <Text style={Styles.transactionsHeading}>{'Processing Transactions'}</Text>
            {gasTransactions.length > 0 ? (
                <FlatList
                    data={gasTransactions}
                    renderItem={({item}) => {
                        return(
                            <View style={[Styles.card]}>
                                <View>
                                    <Text style={Styles.typeText}>{_.truncate(item.pId, {length: 30})}</Text>
                                    <View style={Styles.flewRow}>
                                        <Text style={Styles.dateText}>{`${item.quantity} litre ${item.fuelType}`}</Text>
                                        <CommonFuelType
                                            fuelType={item.fuelType}
                                        />
                                    </View>
                                </View>
                                <View style={Styles.alignCenter}>
                                    <Text style={[Styles.numberText]}>{`${_.round(item.cost, 2)}`}</Text>
                                    <Text style={Styles.dateTextBold}>{`OTP: ${item.otp}`}</Text>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item._id}
                />
            ):(
                <ScrollView style={Styles.emptyContainer}>
                    <EmptyData 
                        message={'No purchases yet....'}
                    /> 
                </ScrollView>
            )}
        </View>
    );
};

export default TransactionsList;