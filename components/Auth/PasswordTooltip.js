import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tooltip from '../Tooltip';
import CheckCircle from '../../assets/jsicons/CheckCircle';
import CrossCircle from '../../assets/jsicons/CrossCircle';

const PasswordTooltip = props => {
  const showCircle = show => {
    if (show) {
      return <CheckCircle />;
    } else return <CrossCircle />;
  };

  const subrequirements = [
    {
      desc: 'Lower case letters (a-z)',
      regex: /(?=.*[a-z])/g
    },
    {
      desc: 'Upper case letters (A-Z)',
      regex: /(?=.*[A-Z])/g
    },
    {
      desc: 'Numbers (i.e. 0-9)',
      regex: /(?=.*\d)/g
    },
    {
      desc: `Special characters (e.g. !@#$%^&*)`,
      regex: /[^A-z\s\d][\\\^]?/g
    }
  ];

  const numVerified = subrequirements.filter(req => props.password.match(req.regex))
    .length;

  return (
    <Tooltip
      opacity={0.96}
      align='right'
      maxWidth='75%'
      height={164}
      show={props.show}
    >
      <Text style={styles.label}>Your password must contain:</Text>
      <View style={styles.passwordRequirement}>
        {showCircle(props.password.match(/(?=.{8,})/gi))}
        <Text style={styles.sublabel}>At least 8 characters</Text>
      </View>
      <View style={styles.passwordRequirement}>
        {showCircle(numVerified >= 3)}
        <Text style={styles.label}>
          At least 3 of the following 4 types of characters:
        </Text>
      </View>
      <View style={styles.subRequirements}>
        {subrequirements.map((requirement, index) => {
          const matches = props.password.match(requirement.regex);
          return (
          <View key={index} style={styles.passwordRequirement}>
            {showCircle(numVerified >=3 || matches)}
            <Text style={{...styles.sublabel, textDecorationLine: numVerified >=3 && !matches ? 'line-through' : 'none'}}>{requirement.desc}</Text>
          </View>
        )})}
      </View>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  passwordRequirement: {
    flexDirection: 'row',
    marginLeft: 10,
    paddingVertical: 0.5
  },
  label: {
    fontFamily: 'Lato-Bold',
    marginLeft: 4
  },
  sublabel: {
    fontFamily: 'Lato',
    marginLeft: 4
  },
  subRequirements: {
    marginLeft: 8
  }
});

export default PasswordTooltip;
