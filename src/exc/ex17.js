import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CORES from "../util/cores";

function renderMarkedText(text, styles) {
  const parts = [];
  const pattern = /\/blue\{([^}]+)\}|\/blue(\S+)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        isBlue: false,
      });
    }

    parts.push({
      text: match[1] || match[2],
      isBlue: true,
    });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      isBlue: false,
    });
  }

  return parts.map((part, index) => (
    <Text
      key={`${part.text}-${index}`}
      style={part.isBlue ? styles.tipVisualBlueText : null}
    >
      {part.text}
    </Text>
  ));
}

export function Exercise17({
  activity,
  styles,
  HeaderComponent,
  next,
  onAttempt,
}) {
  const hasCompletedRef = useRef(false);
  const contentLines = String(activity.content || "").split("\n");

  const handleContinue = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onAttempt?.({
        isCorrect: true,
        correctDelta: 0,
        totalDelta: 0,
        exerciseAccuracy: 100,
      });
    }

    next();
  };

  return (
    <View style={styles.slide}>
      <HeaderComponent />

      <View style={styles.tipVisualBlock}>
        <Text style={styles.tipVisualLabel}>{activity.label}</Text>

        <View style={styles.tipVisualCard}>
          {contentLines.map((line, index) => (
            <Text
              key={`${line}-${index}`}
              style={[
                styles.tipVisualContentLine,
                line.trim() === "" && styles.tipVisualBlankLine,
              ]}
            >
              {renderMarkedText(line, styles)}
            </Text>
          ))}
        </View>

        <TouchableOpacity
          style={styles.tipVisualContinueButton}
          onPress={handleContinue}
        >
          <Text style={styles.tipVisualContinueButtonText}>
            {activity.continueLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ex17 = StyleSheet.create({
  tipVisualBlock: {
    width: "100%",
    alignItems: "center",
  },
  tipVisualLabel: {
    width: "88%",
    color: "#78A2CC",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
    textTransform: "uppercase",
  },
  tipVisualCard: {
    width: "88%",
    borderWidth: 1,
    borderColor: "#8DBCE8",
    backgroundColor: CORES.WHITE,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tipVisualContentLine: {
    color: "#333333",
    fontSize: 16,
    lineHeight: 24,
  },
  tipVisualBlueText: {
    color: "#78A2CC",
    fontWeight: "800",
  },
  tipVisualBlankLine: {
    lineHeight: 14,
  },
  tipVisualContinueButton: {
    width: 180,
    height: 46,
    borderRadius: 8,
    backgroundColor: CORES.SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  tipVisualContinueButtonText: {
    color: CORES.WHITE_SHORT,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default ex17;
