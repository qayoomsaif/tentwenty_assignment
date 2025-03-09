const globalLog = (value: any): void => {
    console.log('[LOG]:', value);
  };
  
  const globalError = (value: any): void => {
    console.error('[ERROR]:', value);
  };
  
  const globalWarn = (value: any): void => {
    console.warn('[WARN]:', value);
  };
  
  // Assign to global
  global.log = globalLog;
  global.error = globalError;
  global.warn = globalWarn;
  
  export default globalLog;
  