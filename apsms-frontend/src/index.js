import dva from 'dva';
import './index.css';
import RouterConfig from "./router"

// 1. Initialize
export const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/login').default);

// 4. Router
// app.router(require('./router').default);
app.router(RouterConfig);

// 5. Start
app.start('#root');
