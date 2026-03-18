import { StyleSheet } from "react-native";
import CORES from "../util/cores";

const ex4 = StyleSheet.create({
  correctSentenceBlock: {
    width: "100%",
    alignItems: "center",
  },
  correctSentenceTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  correctSentenceMediaCard: {
    width: "88%",
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: CORES.SURFACE_MUTED,
  },
  correctSentenceImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  correctSentencePromptPill: {
    width: "88%",
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: CORES.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  correctSentencePromptText: {
    color: CORES.WHITE,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  correctSentenceOptionsList: {
    width: "88%",
    gap: 8,
  },
  correctSentenceOptionWrap: {
    width: "100%",
  },
  correctSentenceOption: {
    width: "100%",
    minHeight: 34,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
  },
  correctSentenceOptionTouch: {
    flex: 1,
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  correctSentenceOptionText: {
    fontSize: 14,
    color: CORES.PRIMARY,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  correctSentenceOptionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  correctSentenceOptionWrong: {
    borderColor: CORES.DANGER,
  },
  correctSentenceOptionTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
    textDecorationLine: "none",
  },
  slide5SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex4;
