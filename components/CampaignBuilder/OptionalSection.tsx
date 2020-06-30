import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../../constants/CampaignBuilder/OptionalSection';
import { Switch } from 'react-native-gesture-handler';

interface IOptionalSectionProps {
  onCollapse?: Function;
  onExpand?: Function;
  icon: Function;
  title: string;
}

interface IOptionalSectionState {
  expanded: boolean;
}

export default class OptionalSection extends Component<
  IOptionalSectionProps,
  IOptionalSectionState
> {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpand = () => {
    this.setState((prevState: any) => {
      if (prevState.expanded) {
        this.props.onCollapse?.();
      } else this.props.onExpand?.();

      return { expanded: !prevState.expanded };
    });
  };

  render() {
    const color = this.state.expanded ? 'black' : 'gray';

    const Icon = this.props.icon;

    return (
      <View style={styles.itemContainers}>
        <View style={styles.itemTitleRow}>
          {Icon && <Icon fill={color} />}
          <Text style={{ ...styles.itemTitleText, color }}>
            {this.props.title}
          </Text>
          <View style={styles.switchContainer}>
            <Switch
              value={this.state.expanded}
              onValueChange={this.toggleExpand}
            />
          </View>
        </View>
        {this.state.expanded ? (
          <View style={styles.itemContentBody}>{this.props.children}</View>
        ) : null}
      </View>
    );
  }
}
