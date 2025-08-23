module.exports = {
  apps: [{
    name: 'story-frontend',
    script: 'npx',
    args: 'vite --host 0.0.0.0 --port 3000',
    cwd: '/home/user/webapp/frontend',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    watch: false,
    max_memory_restart: '1G',
    log_type: 'json',
    merge_logs: true,
    time: true,
    error_file: '/home/user/webapp/frontend/logs/err.log',
    out_file: '/home/user/webapp/frontend/logs/out.log',
    log_file: '/home/user/webapp/frontend/logs/combined.log'
  }]
};