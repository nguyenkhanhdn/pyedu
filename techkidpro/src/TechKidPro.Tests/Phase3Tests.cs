using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TechKidPro.Core.Enums;
using TechKidPro.Services.Assessments;

namespace TechKidPro.Tests
{
    [TestClass]
    public class Phase3Tests
    {
        private static ISet<int> S(params int[] ids) { return new HashSet<int>(ids); }

        [TestMethod]
        public void Scoring_AllOrNothing()
        {
            Assert.IsTrue(ScoringEngine.IsCorrect(S(1, 3), S(3, 1)));
            Assert.IsFalse(ScoringEngine.IsCorrect(S(1, 3), S(1)));
            Assert.IsFalse(ScoringEngine.IsCorrect(S(1, 3), S(1, 2, 3)));
            Assert.IsFalse(ScoringEngine.IsCorrect(S(1), S()));
            Assert.IsFalse(ScoringEngine.IsCorrect(S(), S()));
        }

        [TestMethod]
        public void Percent_RoundsAndGuardsZero()
        {
            Assert.AreEqual(0, ScoringEngine.Percent(0, 0));
            Assert.AreEqual(67, ScoringEngine.Percent(2, 3));
        }

        [TestMethod]
        public void ParseIds_IgnoresGarbage()
        {
            CollectionAssert.AreEquivalent(new[] { 1, 2 }, ScoringEngine.ParseIds("1, 2,x,,").ToArray());
            Assert.AreEqual(0, ScoringEngine.ParseIds(null).Count);
        }

        private static List<OptionInput> Opts(params bool[] correct)
        {
            return correct.Select((c, i) => new OptionInput { Text = "O" + i, IsCorrect = c }).ToList();
        }

        [TestMethod]
        public void Validate_SingleChoice()
        {
            Assert.IsNull(ScoringEngine.ValidateQuestion(QuestionType.SingleChoice, "Q", Opts(true, false)));
            Assert.IsNotNull(ScoringEngine.ValidateQuestion(QuestionType.SingleChoice, "Q", Opts(true, true)));
            Assert.IsNotNull(ScoringEngine.ValidateQuestion(QuestionType.SingleChoice, "Q", Opts(false, false)));
            Assert.IsNotNull(ScoringEngine.ValidateQuestion(QuestionType.SingleChoice, "Q", Opts(true)));
            Assert.IsNotNull(ScoringEngine.ValidateQuestion(QuestionType.SingleChoice, " ", Opts(true, false)));
        }

        [TestMethod]
        public void Validate_MultipleChoiceAndTrueFalse()
        {
            Assert.IsNull(ScoringEngine.ValidateQuestion(QuestionType.MultipleChoice, "Q", Opts(true, true, false)));
            Assert.IsNotNull(ScoringEngine.ValidateQuestion(QuestionType.MultipleChoice, "Q", Opts(false, false)));
            Assert.IsNull(ScoringEngine.ValidateQuestion(QuestionType.TrueFalse, "Q", Opts(true, false)));
            Assert.IsNotNull(ScoringEngine.ValidateQuestion(QuestionType.TrueFalse, "Q", Opts(true, false, false)));
        }

        [TestMethod]
        public void Validate_RejectsEmptyOptionText()
        {
            var o = Opts(true, false); o[1].Text = " ";
            Assert.IsNotNull(ScoringEngine.ValidateQuestion(QuestionType.SingleChoice, "Q", o));
        }
    }
}
