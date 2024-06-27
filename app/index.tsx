import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { marked } from 'marked';
import RenderHtml from 'react-native-render-html';

export default function Index() {
  const [markdownText, setMarkdownText] = useState('');
  const htmlContent = marked(markdownText);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Enter Markdown here..."
        value={markdownText}
        onChangeText={setMarkdownText}
      />
      <ScrollView style={styles.previewContainer}>
        <RenderHtml
          contentWidth={styles.previewContainer.width}
          source={{ html: htmlContent }}
        />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  textInput: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  previewContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
