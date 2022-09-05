var DecisionStrategy;
(function (DecisionStrategy) {
    DecisionStrategy["AFFIRMATIVE"] = "AFFIRMATIVE";
    DecisionStrategy["UNANIMOUS"] = "UNANIMOUS";
    DecisionStrategy["CONSENSUS"] = "CONSENSUS";
})(DecisionStrategy = DecisionStrategy || (DecisionStrategy = {}));
var DecisionEffect;
(function (DecisionEffect) {
    DecisionEffect["Permit"] = "PERMIT";
    DecisionEffect["Deny"] = "DENY";
})(DecisionEffect = DecisionEffect || (DecisionEffect = {}));
var Logic;
(function (Logic) {
    Logic["POSITIVE"] = "POSITIVE";
    Logic["NEGATIVE"] = "NEGATIVE";
})(Logic = Logic || (Logic = {}));

export { DecisionEffect };
