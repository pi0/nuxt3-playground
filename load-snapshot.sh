rm -rf .snapshot
mkdir -p .snapshot
curl https://main--melodic-tulumba-f0d606.netlify.app/app.tgz | tar -xvzf- -C .snapshot
