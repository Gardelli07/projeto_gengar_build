import { StyleSheet } from "react-native";
import CORES from "../util/cores";

const ex14 = StyleSheet.create({
  mediaWrapper: {
    width: "88%",
    marginBottom: 14,
  },
  mediaCard: {
    width: "100%",
    height: 190,
    backgroundColor: "#38BDF8",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CORES.PRIMARY,
    width: "100%",
    height: 48,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    paddingHorizontal: 16,
    gap: 12,
  },
  resultBar: {
    width: "56%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  resultBarText: {
    fontSize: 28,
    fontFamily: "serif",
    fontWeight: "500",
    color: CORES.TEXT_DARK,
  },
  resultBarTextCorrect: {
    color: CORES.SUCCESS_TEXT,
  },
  resultBarTextWrong: {
    color: CORES.DANGER_TEXT,
  },
  resultUnderline: {
    width: "55%",
    height: 2,
    marginTop: 2,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  resultUnderlineCorrect: {
    backgroundColor: CORES.SUCCESS,
  },
  resultUnderlineWrong: {
    backgroundColor: CORES.DANGER,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  optionPill: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 20,
    backgroundColor: CORES.WHITE_SHORT,
  },
  optionPillTouch: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  optionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  optionCorrectText: {
    color: CORES.SUCCESS_TEXT,
    fontWeight: "700",
  },
  optionBlinkWrong: {
    backgroundColor: CORES.DANGER_BG,
    borderColor: CORES.DANGER,
  },
  feedbackBoxWrong: {
    borderColor: CORES.DANGER,
    backgroundColor: "#FEF2F2",
  },
  feedbackTitleWrong: {
    color: CORES.DANGER_TEXT,
  },
});

export default ex14;
