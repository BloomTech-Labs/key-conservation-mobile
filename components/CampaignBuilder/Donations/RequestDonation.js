import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from '../../../constants/CampaignBuilder/Donations/RequestDonation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import PlusSign from '../../../assets/jsicons/headerIcons/plusSign';
import CrossCircle from '../../../assets/jsicons/CrossCircle';

export default class RequestDonation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [
        {
          title: 'New goal...',
          goal: 500,
        },
      ],
    };
  }

  addGoal = () => {
    this.setState(
      (prevState) => ({
        goals: [
          ...prevState.goals,
          {
            title: 'New Goal',
            goal: 20,
          },
        ],
      }),
      () => this.props.onChange?.(this.state.goals)
    );
  };

  removeGoal = (index) => {
    this.setState(
      (prevState) => {
        const newGoals = Array.from(prevState.goals);

        newGoals.splice(index, 1);
        return {
          goals: newGoals,
        };
      },
      () => this.props.onChange?.(this.state.goals)
    );
  };

  editGoal = (index, goal) => {
    this.setState(
      (prevState) => {
        const newGoals = Array.from(prevState.goals);

        newGoals[index] = goal;

        return {
          goals: newGoals,
        };
      },
      () => this.props.onChange?.(this.state.goals)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          In an effort to remain transparent and help supporters know where
          their money is going, we offer organizations the option to list
          multiple, more specific goals rather than a bigger, more obscure one.
          We highly recommend taking the few additional minutes to create this
          list, but you may always create one goal if this does not apply to
          you.
        </Text>
        <Text style={styles.subheader}>Goals</Text>
        <View style={styles.goals}>
          {this.state.goals.length > 0 ? (
            this.state.goals.map((goal, index) => {
              return (
                <DonationGoal
                  key={index}
                  title={goal.title}
                  goal={goal.goal}
                  onTitleChange={(title) =>
                    this.editGoal(index, {
                      ...goal,
                      title,
                    })
                  }
                  onGoalChange={(goalAmount) =>
                    this.editGoal(index, {
                      ...goal,
                      goal: Number(goalAmount),
                    })
                  }
                  onDeleteGoal={() => this.removeGoal(index)}
                />
              );
            })
          ) : (
            <View style={styles.noGoalsContainer}>
              <Text style={styles.noGoalsText}>
                Tap 'Add another goal' below to get started
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={this.addGoal} style={styles.addButton}>
          <View style={styles.plusSign}>
            <PlusSign />
          </View>
          <Text style={styles.addButtonText}>Add another goal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const DonationGoal = (props) => {
  const promptDeleteGoal = () => {
    Alert.alert('Delete goal', 'Are you sure you want to delete this goal?', [
      {
        onPress: props.onDeleteGoal,
        style: 'destructive',
        text: 'Delete Goal',
      },
      { style: 'cancel', text: 'Cancel' },
    ]);
  };

  return (
    <View style={styles.donationGoal}>
      <TouchableOpacity onPress={promptDeleteGoal}>
        <CrossCircle width={24} height={24} marginRight={8} marginTop={8} />
      </TouchableOpacity>
      <View style={styles.inputs}>
        <TextInput
          style={styles.textInput}
          placeholder="New goal..."
          value={props.title}
          onChangeText={props.onTitleChange}
        />
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Goal amount:{`   `}$ </Text>
          <TextInput
            style={styles.textInput}
            placeholder="250"
            value={props.goal.toString()}
            keyboardType="number-pad"
            onChangeText={props.onGoalChange}
          />
        </View>
      </View>
    </View>
  );
};
