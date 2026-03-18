import { StyleSheet } from "react-native";
import CORES from "../util/cores";

const ex3 = StyleSheet.create({
  listenAnswerBlock: {
    width: "100%",
    alignItems: "center",
  },
  listenAnswerTitle: {
    width: "88%",
    textAlign: "left",
    fontSize: 15,
    color: CORES.PRIMARY,
    marginBottom: 10,
    fontWeight: "700",
  },
  listenAnswerPrompt: {
    width: "88%",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    color: CORES.PRIMARY,
    fontWeight: "700",
    marginBottom: 16,
  },
  listenAnswerOptionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  listenAnswerOptionWrap: {
    minWidth: 86,
  },
  listenAnswerOption: {
    height: 40,
    minWidth: 86,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8E1EC",
    backgroundColor: CORES.WHITE,
  },
  listenAnswerOptionTouch: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listenAnswerOptionText: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "600",
  },
  listenAnswerOptionCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  listenAnswerOptionWrong: {
    borderColor: CORES.DANGER,
  },
  listenAnswerOptionTextCorrect: {
    color: CORES.SUCCESS_DARK,
  },
  slide4SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex3;
