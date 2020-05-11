import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { Badge } from 'react-native-elements';
import PlusSign from '../../assets/jsicons/Comments/PlusSign';
import { ActivityIndicator } from 'react-native';
import {
  getCampaignPostReactions,
  setCampaignPostReaction,
} from '../../store/actions';
import { connect } from 'react-redux';

const SmileSelector = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [emoji, setEmoji] = useState({});
  const [activeEmoji, setActiveEmoji] = useState();
  const [loading, setLoading] = useState(true);

  const init = async () => {
    try {
      const emojiReactions = await props.getCampaignPostReactions(props.postId);

      const reactions = {};

      emojiReactions.reactions.forEach((emote) => {
        reactions[emote] = reactions[emote] || 0;
        reactions[emote] += 1;
      });

      if (emojiReactions.userReaction) {
        setActiveEmoji(emojiReactions.userReaction);
      }

      setEmoji(reactions);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  // Called when an emoji is selected from
  // the emoji menu only
  const setEmojis = async (reaction) => {
    setIsVisible(false);

    if (activeEmoji === reaction) {
      // We already used this reaction
      // No need to send a request to server
      return;
    }

    // If emoji exists, we get the count, if not
    // it is 0
    const count = emoji[reaction] || 0;

    // We store previous state to restore it
    // if the network request fails
    const oldActiveEmoji = activeEmoji;
    const oldEmoji = emoji;

    const updated = {
      ...emoji,
      [reaction]: count + 1,
    };

    if (oldActiveEmoji) {
      updated[oldActiveEmoji] = emoji[oldActiveEmoji] - 1;

      // Zero occurences or less, remove from array
      if (updated[oldActiveEmoji] <= 0) {
        delete updated[oldActiveEmoji];
      }
    }

    setEmoji(updated);

    setActiveEmoji({
      emoji: reaction,
    });

    try {
      setLoading(true);
      await props.setCampaignPostReaction(props.postId, reaction);

      setActiveEmoji(reaction);
    } catch (err) {
      console.log(err.message);
      setEmoji(oldEmoji);
      setActiveEmoji(oldActiveEmoji);
    }

    setLoading(false);
  };

  const unsetActiveEmoji = async () => {
    const updates = {
      ...emoji,
      [activeEmoji]: emoji[activeEmoji] - 1,
    };

    if (updates[activeEmoji] <= 0) {
      delete updates[activeEmoji];
    }

    const oldEmoji = emoji;
    const oldActiveEmoji = activeEmoji;

    setEmoji(updates);
    setActiveEmoji(undefined);

    try {
      setLoading(true);
      await props.setCampaignPostReaction(props.postId);
    } catch (err) {
      console.log(err);

      setEmoji(oldEmoji);
      setActiveEmoji(oldActiveEmoji);
    }

    setLoading(false);
  };

  const handleEmojiPress = (emoji) => {
    if (emoji === activeEmoji) {
      // Remove the emoji
      unsetActiveEmoji();
    } else {
      // Add the emoji
      setEmojis(emoji);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayedEmojiWrapper}>
        <TouchableOpacity
          style={styles.plusButton}
          disabled={loading}
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ paddingLeft: 2, paddingTop: 2 }}
            />
          ) : (
            <PlusSign />
          )}
        </TouchableOpacity>

        <View style={styles.display}>
          {Object.entries(emoji).map(([emote, count], i) => {
            if (i < 3) {
              let style = styles.emojiContainer;

              if (emote === activeEmoji) {
                style = styles.emojiContainerActive;
              }

              if (loading) {
                style = {
                  ...style,
                  backgroundColor: 'gray',
                };
              }

              return (
                <TouchableOpacity
                  key={i}
                  style={style}
                  onPress={() => handleEmojiPress(emote)}
                >
                  <Text
                    style={{
                      fontSize: 27,
                      backgroundColor: 'transparent',
                      paddingBottom: 3,
                      paddingRight: 3,
                      paddingLeft: 3,
                    }}
                  >
                    {emote}
                  </Text>

                  {count > 1 && (
                    <Badge
                      textStyle={{
                        color: 'black',
                        fontSize: 15,
                      }}
                      badgeStyle={{
                        backgroundColor: '#D7FF43',
                      }}
                      containerStyle={{
                        position: 'absolute',
                        top: -8,
                        right: -3,
                      }}
                      value={count}
                    />
                  )}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>

      <View>
        {isVisible && (
          <EmojiSelector
            category={Categories.nature}
            onEmojiSelected={(e) => setEmojis(e)}
            placeholder="Search..."
            showHistory={true}
            columns={8}
            theme="#00FF9D"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width - 30,
  },
  display: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  displayedEmojiWrapper: {
    flexDirection: 'row',
  },
  emojiContainer: {
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    margin: 1,
    marginTop: 0,
    marginRight: 3,
    padding: 4,
  },
  emojiContainerActive: {
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E0DFDF',
    margin: 1,
    marginTop: 0,
    marginRight: 3,
    padding: 4,
  },
  plusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    margin: 1,
    marginTop: 0,
    padding: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    width: 40,
    height: 45,
  },
});

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
});

export default connect(mapStateToProps, {
  getCampaignPostReactions,
  setCampaignPostReaction,
})(SmileSelector);
