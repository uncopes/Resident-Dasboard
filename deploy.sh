#!/bin/bash

# Deployment script for Resident Dashboard
# This script builds the Docker image, pushes to ECR, and deploys to ECS

set -e

# Configuration
AWS_REGION=${AWS_REGION:-"us-east-1"}
ECR_REPOSITORY="resident-dashboard"
ECR_URI=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
}

# Check if Docker is running
check_docker() {
    if ! docker info &> /dev/null; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Get AWS account ID
get_aws_account_id() {
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    print_status "AWS Account ID: ${AWS_ACCOUNT_ID}"
}

# Login to ECR
login_to_ecr() {
    print_status "Logging in to ECR..."
    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_URI}
}

# Build and push Docker image
build_and_push() {
    print_status "Building Docker image..."
    docker build -t ${ECR_REPOSITORY}:latest .
    
    print_status "Tagging image for ECR..."
    docker tag ${ECR_REPOSITORY}:latest ${ECR_URI}/${ECR_REPOSITORY}:latest
    
    print_status "Pushing image to ECR..."
    docker push ${ECR_URI}/${ECR_REPOSITORY}:latest
}

# Deploy with Terraform
deploy_terraform() {
    print_status "Deploying with Terraform..."
    cd terraform
    
    # Initialize Terraform
    print_status "Initializing Terraform..."
    terraform init
    
    # Plan the deployment
    print_status "Planning deployment..."
    terraform plan -var="aws_region=${AWS_REGION}"
    
    # Apply the deployment
    print_status "Applying deployment..."
    terraform apply -var="aws_region=${AWS_REGION}" -auto-approve
    
    # Get outputs
    ALB_DNS=$(terraform output -raw alb_dns_name)
    print_status "Application deployed successfully!"
    print_status "Load Balancer DNS: http://${ALB_DNS}"
    
    cd ..
}

# Main deployment function
main() {
    print_status "Starting deployment process..."
    
    # Pre-flight checks
    check_aws_cli
    check_docker
    
    # Get AWS account info
    get_aws_account_id
    
    # Login to ECR
    login_to_ecr
    
    # Build and push image
    build_and_push
    
    # Deploy with Terraform
    deploy_terraform
    
    print_status "Deployment completed successfully!"
    print_status "Your application should be available at the Load Balancer DNS above."
}

# Run main function
main "$@" 