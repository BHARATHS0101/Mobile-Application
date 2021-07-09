import {StyleSheet} from 'react-native';

import {Colors, Typography} from '@styles/index';

export default StyleSheet.create({
    
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.NEAR_WHITE,
    },

    text: {
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontSize: Typography.FONT_SIZE_16,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
        color: Colors.PRIMARY,
    }
});