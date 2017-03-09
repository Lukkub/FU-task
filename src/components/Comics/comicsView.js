import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ComicsModal from './comicsModal';

class ComicsView extends Component {

    static propTypes = {
        comics: PropTypes.object
    };

    constructor (props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.renderSeparator = this.renderSeparator.bind(this);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            selectedComics: null,
            dataSource: ds.cloneWithRows(props.comics.data)
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.comics.id !== this.props.comics.id) {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.comics.data)
            });
        }
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

    renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
              key={`${sectionID}-${rowID}`}
              style={{
                  height: adjacentRowHighlighted ? 4 : 1,
                  backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
              }}
              />
        );
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.props.comics.data.map((obj) => this.renderRow(obj))}
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
