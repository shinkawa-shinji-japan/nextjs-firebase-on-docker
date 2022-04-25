# Prebuilt MS image
FROM mcr.microsoft.com/playwright:focal

ENV PWUSER pwuser

# Install aws-lambda-ric build dependencies
#RUN echo 'nameserver 1.1.1.1' | tee /etc/resolv.conf
RUN apt-get update && apt-get install -y sudo bash-completion less nano wget curl\
    && usermod -aG sudo $PWUSER\
    && echo '%sudo ALL=(ALL) NOPASSWD:ALL' | tee -a /etc/sudoers\
    && npm i -g npm\
    && npx playwright install msedge

USER $PWUSER

WORKDIR /home/$PWUSER/app
RUN sudo chown -R $PWUSER:$PWUSER /home/$PWUSER/app
COPY --chown=$PWUSER:$PWUSER . .

RUN npm init -y\
    && npm i -D playwright @playwright/test dotenv

# ENTRYPOINT ["node", "./sample.js"]