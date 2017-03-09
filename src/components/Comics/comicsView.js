import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ComicsModal from './comicsModal';
import lodash from 'lodash';

class ComicsView extends Component {

    static propTypes = {
        comics: PropTypes.object
    };

    constructor (props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);

        this.state = {
            selectedComics: null
        };
    }

    renderRow (rowData) {
        const { id, title } = rowData;

        return (
            <TouchableOpacity key={id}
              style={styles.containerRow}
              onPress={() => this.setState({ selectedComics: rowData })}
              >
                <Text style={styles.rowTitle}>{title}</Text>
            </TouchableOpacity>
        );
    }

    render () {
        const comicsData = lodash.get(this.props, 'comics.data', []);

        return (
            <View style={styles.container}>
                <ScrollView>
                    {comicsData.map((obj) => this.renderRow(obj))}
                </ScrollView>
                <ComicsModal
                  data={this.state.selectedComics}
                  onClose={() => this.setState({ selectedComics: null })} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'red'
    },
    rowTitle: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    }
});

export default ComicsView;
