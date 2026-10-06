using System;
using System.Diagnostics;
using TechKidPro.Core.Interfaces;

namespace TechKidPro.Infrastructure.Logging
{
    public class TraceLogger : ILogger
    {
        public void Info(string message) { Trace.TraceInformation(message); }
        public void Warn(string message) { Trace.TraceWarning(message); }
        public void Error(string message, Exception ex = null) { Trace.TraceError(ex == null ? message : message + Environment.NewLine + ex); }
    }
}
