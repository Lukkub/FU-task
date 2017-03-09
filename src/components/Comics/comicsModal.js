import React, { Component, PropTypes } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, LayoutAnimation } from 'react-native';

class ComicsModal extends Component {

    static propTypes = {
        data: PropTypes.object,
        onClose: PropTypes.func
    };

    componentWillMount () {
        LayoutAnimation.easeInEaseOut();
    }

    componentWillUpdate () {
        LayoutAnimation.easeInEaseOut();
    }

    render () {
        const { data, onClose } = this.props;

        if (!data) {
            return null;
        }

        const { title, description, images } = data;

        const path = (images.length > 0) ? images[0].path.replace('http', 'https') + '.' + images[0].extension : null;
        const coverImage = (path) ? <Image style={styles.cover} resizeMode={'contain'} source={{ uri: path }} /> : null;

        return (
            <View style={styles.container}>
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.exitButton} onPress={onClose}>
                        <Text style={styles.exitText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.titleText} >{ title }</Text>
                    {coverImage}
                    <ScrollView style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>{ description || 'NO DATA' }</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modal: {
        marginTop: 65,
        width: width * 0.9,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: 'red',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    exitButton: {
        width: 20,
        height: 20,
        borderRadius: 5,
        padding: 2,
        backgroundColor: 'red',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    exitText: {
        fontSize: 13,
        textAlign: 'center',
        color: 'black'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: 'black'
    },
    cover: {
        width: width * 0.6,
        height: height * 0.3
    },
    descriptionContainer: {
        maxHeight: height * 0.2,
        marginTop: 10,
        marginBottom: 10
    },
    descriptionText: {
        fontSize: 11,
        textAlign: 'justify',
        color: 'black',
        marginTop: 10,
        marginBottom: 10
    }
});

export default ComicsModal;
