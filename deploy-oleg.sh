echo '=========== Client ==========='
cd client
npm run build
cd ..
echo '=========== Server ==========='
npm run build
echo '=========== ZIP ==========='
zip -rq9 crng.zip dist/ public/ package.json package-lock.json
echo 'crng.zip created'
echo '=========== MOVE TO SERVER ==========='
scp crng.zip oleg@159.89.24.192:/home/oleg/carnegie
scp app.dev.json oleg@159.89.24.192:/home/oleg/carnegie
scp ecosystem.json oleg@159.89.24.192:/home/oleg/carnegie

CMD='
SRC=/home/oleg/carnegie;
DEST=/opt/crng;

cd $SRC;
unzip -oq crng.zip -d $DEST;

cd $DEST;
npm i;
'

ssh -t oleg@159.89.24.192 $CMD
rm -rf crng.zip
