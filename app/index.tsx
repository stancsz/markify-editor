import React, { useState, useCallback } from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { marked } from 'marked';
import RenderHtml from 'react-native-render-html';
import { Dimensions } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

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
    <ScrollView className="container">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary" onClick={() => setMode('default')}>Default View</button>
        <button type="button" className="btn btn-secondary" onClick={() => setMode('singleContainer')}>Single Container View</button>
        <button type="button" className="btn btn-secondary" onClick={() => setMode('focusMode')}>Focus Mode</button>
      </div>
      {mode === 'default' && (
        <div className="row">
          <div className="col">
            <TextInput
              className="form-control"
              multiline
              placeholder="Enter Markdown here..."
              value={markdownText}
              onChangeText={setMarkdownText}
            />
          </div>
          <div className="col">
            <div className="p-3 border bg-light">
              <RenderHtml
                contentWidth={width}
                source={{ html: htmlContent }}
                onPress={(e) => handleSectionPress(e)}
              />
            </div>
          </div>
        </div>
      )}
      {mode === 'singleContainer' && (
        <div className="container mt-3">
          {isEditMode ? (
            <TextInput
              className="form-control"
              multiline
              placeholder="Enter Markdown here..."
              value={markdownText}
              onChangeText={setMarkdownText}
            />
          ) : (
            <div className="p-3 border bg-light">
              <RenderHtml
                contentWidth={width}
                source={{ html: htmlContent }}
              />
            </div>
          )}
          <button type="button" className="btn btn-secondary mt-2" onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? 'Render' : 'Edit'}
          </button>
        </div>
      )}
      {mode === 'focusMode' && (
        <div className="container mt-3">
          <div className="p-3 border bg-light">
            <RenderHtml
              contentWidth={width}
              source={{ html: htmlContent }}
              onPress={(e) => handleSectionPress(e)}
            />
          </div>
          {focusText !== '' && (
            <TextInput
              className="form-control position-absolute"
              style={{ top: `${focusPosition.y}px`, left: `${focusPosition.x}px` }}
              multiline
              value={focusText}
              onChangeText={setFocusText}
              onBlur={handleSave}
            />
          )}
        </div>
      )}
    </ScrollView>
  );
}
