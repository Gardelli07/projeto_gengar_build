import { StyleSheet } from "react-native";
import CORES from "../util/cores";

const ex6 = StyleSheet.create({
  orderSentenceBlock: {
    width: "100%",
    alignItems: "center",
  },
  orderSentenceTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  orderSentenceAnswerBox: {
    width: "88%",
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 6,
    marginBottom: 14,
  },
  orderSentenceAnswerBoxCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  orderSentenceAnswerBoxWrong: {
    borderColor: CORES.DANGER,
  },
  orderSentencePlaceholder: {
    color: CORES.PRIMARY,
    fontSize: 14,
  },
  orderSentenceSelectedWord: {
    minHeight: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  orderSentenceSelectedWordCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  orderSentenceSelectedWordText: {
    color: CORES.PRIMARY,
    fontSize: 13,
  },
  orderSentenceSelectedWordTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
  },
  orderSentenceOptionsRow: {
    width: "88%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  orderSentenceOption: {
    minHeight: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  orderSentenceOptionUsed: {
    backgroundColor: CORES.SURFACE_MUTED,
    borderColor: CORES.BORDER_LIGHT,
  },
  orderSentenceOptionText: {
    color: CORES.PRIMARY,
    fontSize: 13,
    textDecorationLine: "underline",
  },
  orderSentenceOptionTextUsed: {
    color: "#93C5FD",
    textDecorationLine: "none",
  },
  slide7SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex6;
