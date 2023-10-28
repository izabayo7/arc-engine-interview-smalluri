FROM amazon/dynamodb-local:2.0.0

USER root

RUN yum update -y && yum install -y \
    curl-minimal \
    unzip \
    less \
    && \
    rm -rf /var/cache/apk/*
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-$(uname -m).zip" -o "/tmp/awscliv2.zip"
RUN unzip /tmp/awscliv2.zip -d /tmp/awscliv2
RUN /tmp/awscliv2/aws/install

RUN mkdir -p /data
RUN chown dynamodblocal:dynamodblocal /data

COPY ./tables /tables
COPY ./run.sh /run.sh

RUN chmod +r /tables/*.json
RUN chmod +x /run.sh

USER dynamodblocal
ENTRYPOINT /run.sh
