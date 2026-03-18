import { StyleSheet } from "react-native";
import CORES from "../util/cores";

const ex5 = StyleSheet.create({
  completePhraseBlock: {
    width: "100%",
    alignItems: "center",
  },
  completePhraseTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  completePhraseMediaCard: {
    width: "88%",
    height: 150,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: CORES.SURFACE_MUTED,
  },
  completePhraseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  completePhraseSentencePill: {
    width: "88%",
    minHeight: 38,
    borderRadius: 19,
    backgroundColor: CORES.PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  completePhraseSentenceText: {
    color: CORES.WHITE,
    fontSize: 15,
    fontWeight: "700",
  },
  completePhraseBlank: {
    minWidth: 68,
    minHeight: 26,
    borderRadius: 13,
    backgroundColor: CORES.WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  completePhraseBlankCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderWidth: 1,
    borderColor: CORES.SUCCESS,
  },
  completePhraseBlankWrong: {
    borderWidth: 1,
    borderColor: CORES.DANGER,
  },
  completePhraseBlankText: {
    color: CORES.PRIMARY,
    fontSize: 14,
    fontWeight: "700",
  },
  completePhraseBlankTextCorrect: {
    color: CORES.SUCCESS_DARK,
  },
  completePhraseOptionsRow: {
    flexDirection: "row",
    gap: 16,
  },
  completePhraseOptionWrap: {
    minWidth: 70,
  },
  completePhraseOption: {
    minWidth: 70,
    minHeight: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
  },
  completePhraseOptionTouch: {
    flex: 1,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  completePhraseOptionText: {
    fontSize: 14,
    color: CORES.PRIMARY,
    textAlign: "center",
  },
  completePhraseOptionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  completePhraseOptionWrong: {
    borderColor: CORES.DANGER,
  },
  completePhraseOptionTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
  },
  slide6SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex5;
