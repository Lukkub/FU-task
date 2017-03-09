import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import lodash from 'lodash';

const STORAGE_KEY = 'comics';

class Home extends Component {

    static propTypes = {
        getComicsCollection: PropTypes.func,
        isPending: PropTypes.bool,
        comics: PropTypes.object
    };

    constructor (props) {
        super(props);

        this.buttonPress = this.buttonPress.bind(this);
        this.saveAsyncStorage = this.saveAsyncStorage.bind(this);
        this.loadAsyncStorageData = this.loadAsyncStorageData.bind(this);
    }

    componentDidMount () {
        this.loadAsyncStorageData();
    }

    async loadAsyncStorageData () {
        const { setComicsCollection } = this.props;
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            if (data !== null) {
                setComicsCollection(JSON.parse(data));
            }
        } catch (error) {
            console.warn('Error in loadAsyncStorageData', error.message);
        }
    }

    componentWillReceiveProps (nextProps) {
        this.saveAsyncStorage(nextProps, this.props);
    }

    async saveAsyncStorage (nextProps, currentProps) {
        const nextComicsObj = nextProps.comics;
        const currentComicsObj = currentProps.comics;

        if (nextComicsObj.id !== currentComicsObj.id) {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextComicsObj));
            } catch (error) {
                console.warn('Error in saveAsyncStorage', error.message);
            }
        }
    }

    buttonPress (action, condition) {
        const { isPending } = this.props;

        if (isPending || condition || !action) {
            return;
        }

        action();
    }

    render () {
        const { comics, getComicsCollection, isPending } = this.props;

        const getBtnStyle = styles.button;
        const showBtnStyle = (lodash.isArray(comics.data)) ? styles.button : [styles.button, styles.disableButton];

        return (
            <View style={styles.container}>
                <Text style={styles.title}> MARVEL API TEST </Text>
                <TouchableOpacity
                  style={getBtnStyle}
                  onPress={() => AsyncStorage.clear()}
                  >
                    <Text style={styles.buttonText}> CLEAR STORAGE </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={getBtnStyle}
                  onPress={() => this.buttonPress(getComicsCollection)}
                  >
                    <Text style={styles.buttonText}> GET COMICS </Text>
                </TouchableOpacity>
                {isPending && <Text> Getting data... </Text>}
                <TouchableOpacity
                  style={showBtnStyle}
                  onPress={() => this.buttonPress(Actions.comics, !lodash.isArray(comics.data))}
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
        marginBottom: 30,
        color: 'red'
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
