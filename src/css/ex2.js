import { StyleSheet } from "react-native";
import CORES from "../util/cores";

const ex2 = StyleSheet.create({
  completeActivityBlock: {
    width: "100%",
    alignItems: "center",
  },
  completeCard: {
    width: "88%",
    minHeight: 360,
    backgroundColor: CORES.WHITE,
    borderWidth: 2,
    borderColor: CORES.PRIMARY,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 16,
    overflow: "visible",
  },
  completeLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
    overflow: "visible",
  },
  completeWord: {
    fontSize: 16,
    lineHeight: 30,
    color: "#1F2937",
  },
  blankWrapper: {
    position: "relative",
    marginHorizontal: 3,
    marginVertical: 2,
    alignItems: "flex-start",
    zIndex: 1,
    overflow: "visible",
  },
  blankWrapperOpen: {
    zIndex: 50,
    elevation: 20,
  },
  blankButton: {
    minWidth: 50,
    height: 34,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    backgroundColor: CORES.WHITE,
  },
  blankButtonTouchArea: {
    flex: 1,
    minWidth: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  blankButtonCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
  },
  blankButtonWrong: {
    borderColor: CORES.DANGER,
  },
  blankButtonText: {
    fontSize: 15,
    color: "#6B7280",
  },
  blankButtonTextCorrect: {
    color: CORES.SUCCESS_DARK,
    fontWeight: "700",
  },
  blankOptionsMenu: {
    position: "absolute",
    top: 38,
    left: 0,
    minWidth: 78,
    backgroundColor: CORES.WHITE,
    borderWidth: 1.5,
    borderColor: CORES.PRIMARY,
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 60,
    elevation: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  blankOptionItem: {
    minHeight: 34,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DBEAFE",
  },
  blankOptionItemLast: {
    borderBottomWidth: 0,
  },
  blankOptionText: {
    fontSize: 15,
    color: CORES.TEXT_DARK,
  },
  slide3SuccessAlertCard: {
    marginHorizontal: 12,
    marginBottom: 0,
    zIndex: 200,
    elevation: 30,
  },
});

export default ex2;
