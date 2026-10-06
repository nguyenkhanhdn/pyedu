using Microsoft.VisualStudio.TestTools.UnitTesting;
using TechKidPro.Core.Common;
using TechKidPro.Core.Entities.Catalog;
using TechKidPro.Core.Enums;

namespace TechKidPro.Tests
{
    [TestClass]
    public class DomainTests
    {
        [TestMethod]
        public void Course_DefaultsToDraft()
        {
            Assert.AreEqual(PublishStatus.Draft, new Course().Status);
        }

        [TestMethod]
        public void Course_IsAuditable()
        {
            Assert.IsInstanceOfType(new Course(), typeof(IAuditable));
        }

        [TestMethod]
        public void RoleNames_ContainsThreeRoles()
        {
            CollectionAssert.AreEquivalent(new[] { "Student", "Mentor", "Admin" }, RoleNames.All);
        }
    }
}
