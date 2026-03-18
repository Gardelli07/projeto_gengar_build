import { StyleSheet } from "react-native";
import CORES from "../util/cores";

const ex1 = StyleSheet.create({
  matchBlock: {
    width: "88%",
    alignItems: "center",
  },
  matchList: {
    width: "100%",
    gap: 10,
    marginTop: 4,
  },
  matchCard: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  matchCardEnglish: {
    backgroundColor: CORES.WHITE,
    borderColor: "#60A5FA",
  },
  matchCardTranslation: {
    backgroundColor: CORES.BLUE_SOFT,
    borderColor: CORES.BLUE_SOFT,
  },
  matchCardSelected: {
    borderColor: CORES.BRAND_STRONG,
    borderWidth: 2,
  },
  matchCardTranslationSelected: {
    backgroundColor: "#4A8FC8",
    borderColor: CORES.BRAND_STRONG,
    borderWidth: 2,
  },
  matchCardCorrect: {
    backgroundColor: CORES.SUCCESS_BG,
    borderColor: CORES.SUCCESS,
    borderWidth: 2,
  },
  matchCardWrong: {
    borderColor: CORES.DANGER,
    borderWidth: 2,
  },
  matchCardButton: {
    width: "100%",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  matchCardText: {
    fontSize: 19,
    color: "#397BB2",
    fontFamily: "serif",
  },
  matchCardTextTranslation: {
    color: CORES.WHITE,
  },
  matchCardTextCorrect: {
    color: "#166534",
    fontWeight: "700",
  },
});

export default ex1;
