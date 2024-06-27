import React, { useState, useCallback } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { marked } from 'marked';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Index() {
  const [markdownText, setMarkdownText] = useState('');
  const [mode, setMode] = useState('default');
  const [isEditMode, setIsEditMode] = useState(true);
  const [focusText, setFocusText] = useState('');
  const [focusPosition, setFocusPosition] = useState({ x: 0, y: 0 });
  const htmlContent = marked(markdownText);

  const handleSectionPress = useCallback((e) => {
    const { locationX, locationY } = e.nativeEvent;
    const touchedText = markdownText; // This should be the logic to get the exact word based on touch location
    setFocusText(touchedText);
    setFocusPosition({ x: locationX, y: locationY });
  }, [markdownText]);

  const handleSave = useCallback(() => {
    setMarkdownText((prevText) => prevText.replace(focusText, focusText));
    setFocusText('');
  }, [focusText]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setMode('default')}><Text>Default View</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('singleContainer')}><Text>Single Container View</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setMode('focusMode')}><Text>Focus Mode</Text></TouchableOpacity>
        {mode === 'singleContainer' && <TouchableOpacity style={styles.button} onPress={() => setIsEditMode(!isEditMode)}><Text>{isEditMode ? 'Rendered Mode' : 'Edit Mode'}</Text></TouchableOpacity>}
      </View>

      {mode === 'default' && (
        <View>
          <TextInput
            style={[styles.textInput, styles.editor]}
            multiline
            placeholder="Enter Markdown here..."
            value={markdownText}
            onChangeText={setMarkdownText}
          />
          <View style={styles.previewContainer}>
            <RenderHtml
              contentWidth={width}
              source={{ html: htmlContent }}
              tagsStyles={htmlStyles}
              onPress={(e) => handleSectionPress(e)}
            />
          </View>
        </View>
      )}

      {mode === 'singleContainer' && (
        <View style={styles.singleContainer}>
          {isEditMode ? (
            <TextInput
              style={[styles.textInput, styles.editor]}
              multiline
              placeholder="Enter Markdown here..."
              value={markdownText}
              onChangeText={setMarkdownText}
            />
          ) : (
            <View style={styles.previewContainerSingle}>
              <RenderHtml
                contentWidth={width}
                source={{ html: htmlContent }}
              />
            </View>
          )}
        </View>
      )}

      {mode === 'focusMode' && (
        <View style={styles.focusContainer}>
          <View style={styles.previewFocusContainer}>
            <RenderHtml
              contentWidth={width}
              source={{ html: htmlContent }}
              onPress={(e) => handleSectionPress(e)}
            />
          </View>
          {focusText !== '' && (
            <TextInput
              style={[styles.focusTextInput, { top: focusPosition.y, left: focusPosition.x }]}
              multiline
              value={focusText}
              onChangeText={setFocusText}
              onBlur={handleSave}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  textInput: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  previewContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
  },
  previewContainerSingle: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
  },
  previewFocusContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
  },
  editor: {
    fontFamily: 'monospace',
    fontSize: 16,
  },
  singleContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 16,
  },
  focusContainer: {
    flex: 1,
  },
  focusTextInput: {
    position: 'absolute',
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    fontFamily: 'monospace',
    fontSize: 16,
  },
});

const htmlStyles = {
  body: {
    fontFamily: 'serif',
    fontSize: 16,
  },
};
