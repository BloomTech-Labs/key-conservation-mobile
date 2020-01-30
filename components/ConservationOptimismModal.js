import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";

const ConservationOptimismModal = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>
              Practicing Conservation Optimism means that you will help promote
              messages of hope instead of negativity while using the Key
              Conservation app. We know there will be trying days and bad things
              will happen but we can still be hopeful that we can make a
              difference. This means you will be honest about what is happening
              in your posts but you will also provide steps for supporters to
              give help and ideas so the situation can be fixed or stop from
              occurring again.
            </Text>

            <TouchableHighlight
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              <Text>X</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConservationOptimismModal;

// class ModalExample extends Component {
//   state = {
//     modalVisible: false,
//   };

//   setModalVisible(visible) {
//     this.setState({modalVisible: visible});
//   }

//   render() {
//     return (
//       <View style={{marginTop: 22}}>
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={this.state.modalVisible}
//           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
//           }}>
//           <View style={{marginTop: 22}}>
//             <View>
//               <Text>Hello World!</Text>

//               <TouchableHighlight
//                 onPress={() => {
//                   this.setModalVisible(!this.state.modalVisible);
//                 }}>
//                 <Text>Hide Modal</Text>
//               </TouchableHighlight>
//             </View>
//           </View>
//         </Modal>

//         <TouchableHighlight
//           onPress={() => {
//             this.setModalVisible(true);
//           }}>
//           <Text>Show Modal</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }
