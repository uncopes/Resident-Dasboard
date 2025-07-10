# Deployment Guide - Resident Dashboard

This guide explains how to deploy the Resident Dashboard application to AWS using Docker, Terraform, and ECS.

## Prerequisites

### Required Tools
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **AWS CLI** - [Installation guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **Terraform** - [Download here](https://www.terraform.io/downloads)
- **Node.js 18+** - [Download here](https://nodejs.org/)

### AWS Requirements
- AWS Account with appropriate permissions
- AWS credentials configured (`aws configure`)
- Sufficient IAM permissions for ECS, ECR, VPC, ALB, and CloudWatch

## Quick Deployment

### Option 1: Automated Deployment Script

1. **Make the script executable** (Linux/Mac):
   ```bash
   chmod +x deploy.sh
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```

The script will automatically:
- Build the Docker image
- Push to ECR
- Deploy infrastructure with Terraform
- Provide the application URL

### Option 2: Manual Deployment

#### Step 1: Build and Test Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the frontend**:
   ```bash
   npm run build
   ```

3. **Test locally**:
   ```bash
   npm run dev
   ```

4. **Test Docker build**:
   ```bash
   docker build -t resident-dashboard .
   docker run -p 8088:8088 resident-dashboard
   ```

#### Step 2: Deploy to AWS

1. **Configure AWS credentials**:
   ```bash
   aws configure
   ```

2. **Get your AWS account ID**:
   ```bash
   aws sts get-caller-identity --query Account --output text
   ```

3. **Login to ECR**:
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
   ```

4. **Build and push to ECR**:
   ```bash
   # Build image
   docker build -t resident-dashboard .
   
   # Tag for ECR
   docker tag resident-dashboard:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/resident-dashboard:latest
   
   # Push to ECR
   docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/resident-dashboard:latest
   ```

5. **Deploy with Terraform**:
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

## Infrastructure Overview

The Terraform configuration creates:

### Core AWS Resources
- **ECR Repository**: Stores Docker images
- **ECS Cluster**: Runs containerized applications
- **ECS Task Definition**: Defines how containers run
- **ECS Service**: Manages running containers

### Networking
- **VPC**: Virtual private cloud
- **Public Subnets**: For internet-facing resources
- **Internet Gateway**: Internet connectivity
- **Route Tables**: Network routing

### Load Balancing
- **Application Load Balancer**: Distributes traffic
- **Target Group**: Health checks and routing
- **Security Groups**: Network security rules

### Monitoring
- **CloudWatch Logs**: Application logging
- **Container Insights**: ECS monitoring

## Configuration

### Environment Variables

The application supports these environment variables:

```bash
NODE_ENV=production
PORT=8088
AWS_REGION=us-east-1
```

### Terraform Variables

Edit `terraform/variables.tf` to customize:

```hcl
variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "production"
}
```

## Monitoring and Logs

### CloudWatch Logs
- Log group: `/ecs/resident-dashboard`
- Retention: 30 days
- Stream prefix: `ecs`

### Health Checks
- Path: `/api/health`
- Interval: 30 seconds
- Timeout: 5 seconds
- Healthy threshold: 2
- Unhealthy threshold: 2

## Scaling

### Auto Scaling
The ECS service is configured with:
- **Desired count**: 2 tasks
- **CPU**: 256 units (0.25 vCPU)
- **Memory**: 512 MB

### Manual Scaling
```bash
aws ecs update-service \
  --cluster resident-dashboard-cluster \
  --service resident-dashboard-service \
  --desired-count 4
```

## Troubleshooting

### Common Issues

1. **Docker build fails**:
   - Ensure Docker Desktop is running
   - Check available disk space
   - Verify Node.js version

2. **ECR push fails**:
   - Verify AWS credentials
   - Check ECR repository exists
   - Ensure proper IAM permissions

3. **Terraform apply fails**:
   - Check AWS credentials
   - Verify region availability
   - Ensure sufficient service quotas

4. **Application not accessible**:
   - Check security group rules
   - Verify ALB health checks
   - Check ECS service logs

### Debugging Commands

```bash
# Check ECS service status
aws ecs describe-services \
  --cluster resident-dashboard-cluster \
  --services resident-dashboard-service

# View application logs
aws logs describe-log-streams \
  --log-group-name /ecs/resident-dashboard

# Check ALB health
aws elbv2 describe-target-health \
  --target-group-arn <target-group-arn>
```

## Security Considerations

### Network Security
- ALB in public subnets
- ECS tasks in private subnets (recommended for production)
- Security groups restrict traffic

### IAM Permissions
- ECS task execution role has minimal permissions
- ECR repository has image scanning enabled

### Data Protection
- No sensitive data stored in containers
- Use AWS Secrets Manager for production secrets
- Enable VPC flow logs for network monitoring

## Cost Optimization

### Estimated Monthly Costs (us-east-1)
- **ECS Fargate**: ~$30-50 (2 tasks)
- **ALB**: ~$20
- **ECR**: ~$5-10
- **CloudWatch**: ~$5-10
- **Data Transfer**: ~$5-10

**Total**: ~$65-100/month

### Cost Reduction Tips
- Use Spot instances for non-critical workloads
- Implement auto-scaling based on demand
- Monitor and optimize resource allocation
- Use CloudWatch alarms for cost monitoring

## Production Recommendations

### High Availability
- Deploy across multiple AZs
- Use auto-scaling groups
- Implement health checks
- Set up monitoring and alerting

### Security
- Use private subnets for ECS tasks
- Implement WAF for ALB
- Enable VPC flow logs
- Use AWS Certificate Manager for HTTPS

### Performance
- Enable ALB access logs
- Implement caching strategies
- Use CDN for static assets
- Monitor and optimize database queries

## Support

For deployment issues:
1. Check the troubleshooting section above
2. Review CloudWatch logs
3. Verify AWS service status
4. Contact the development team

## Next Steps

After successful deployment:
1. Configure custom domain
2. Set up SSL certificate
3. Implement monitoring and alerting
4. Configure backup strategies
5. Plan for disaster recovery 