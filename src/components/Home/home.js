import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import lodash from 'lodash';

class Home extends Component {

    static propTypes = {
        getComicsCollection: PropTypes.func,
        isPending: PropTypes.bool,
        comics: PropTypes.array
    };

    constructor (props) {
        super(props);

        this.buttonPress = this.buttonPress.bind(this);
    }

    componentWillReceiveProps (nextProps) {

    }

    buttonPress (action, condition) {
        const { isPending } = this.props;

        if (isPending || condition || !action) {
            return;
        }

        action();
    }

    render () {
        const { comics, getComicsCollection } = this.props;

        const getBtnStyle = styles.button;
        const showBtnStyle = (lodash.isArray(comics)) ? styles.button : [styles.button, styles.disableButton];

        return (
            <View style={styles.container}>
                <Text style={styles.title}> MARVEL API TEST </Text>
                <TouchableOpacity
                  style={getBtnStyle}
                  onPress={() => this.buttonPress(getComicsCollection)}
                  >
                    <Text style={styles.buttonText}> GET COMICS </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={showBtnStyle}
                  onPress={() => this.buttonPress(() => console.log('fire'), !lodash.isArray(comics))}
                  >
                    <Text style={styles.buttonText}> SHOW COMICS </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        marginTop: 20
    },
    button: {
        backgroundColor: 'black',
        margin: 10
    },
    disableButton: {
        backgroundColor: 'rgba(0,0,0, 0.4)'
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    },
    image: {
        width: 100,
        height: 100
    }
});

export default Home;
