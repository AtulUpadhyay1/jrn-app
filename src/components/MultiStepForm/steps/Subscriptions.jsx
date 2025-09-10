import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Basic profile creation",
      "Limited job applications (5/month)",
      "Basic resume builder",
      "Community access",
      "Email notifications",
    ],
    limitations: [
      "Limited advanced features",
      "No priority support",
      "Basic analytics only",
    ],
    popular: false,
    color: "gray",
  },
  {
    id: "pro",
    name: "Professional",
    price: "$19",
    period: "per month",
    description: "Best for active job seekers",
    features: [
      "Everything in Free",
      "Unlimited job applications",
      "Advanced resume builder with templates",
      "Priority customer support",
      "Advanced analytics and insights",
      "Video introduction hosting",
      "Custom portfolio showcase",
      "Interview preparation tools",
    ],
    limitations: [],
    popular: true,
    color: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$49",
    period: "per month",
    description: "For teams and organizations",
    features: [
      "Everything in Professional",
      "Team collaboration tools",
      "Advanced reporting",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Custom branding options",
      "Advanced security features",
    ],
    limitations: [],
    popular: false,
    color: "success",
  },
];

const Subscriptions = ({ data, updateFormData, onNext, onPrevious, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const [selectedPlan, setSelectedPlan] = useState(data.subscriptions?.selectedPlan || "free");
  const [billingCycle, setBillingCycle] = useState(data.subscriptions?.billingCycle || "monthly");

  const {
    handleSubmit,
  } = useForm({
    defaultValues: data.subscriptions || {},
  });

  // Update form when data changes (e.g., when API data is loaded)
  useEffect(() => {
    if (data.subscriptions) {
      setSelectedPlan(data.subscriptions.selectedPlan || "free");
      setBillingCycle(data.subscriptions.billingCycle || "monthly");
    }
  }, [data.subscriptions]);

  const onSubmit = async () => {
    try {
      const subscriptionData = {
        selectedPlan,
        billingCycle,
        timestamp: new Date().toISOString(),
      };
      
      // Submit data to API through parent component
      await onStepSubmit('subscriptions', subscriptionData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to submit subscription data:", error);
      // You can add error handling UI here
    }
  };

  const getPlanPrice = (plan) => {
    if (plan.id === "free") return plan.price;
    
    if (billingCycle === "yearly") {
      const monthlyPrice = parseInt(plan.price.replace("$", ""));
      const yearlyPrice = monthlyPrice * 10; // 2 months free
      return `$${yearlyPrice}`;
    }
    return plan.price;
  };

  const getPlanPeriod = (plan) => {
    if (plan.id === "free") return plan.period;
    return billingCycle === "yearly" ? "per year" : "per month";
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Choose Your Plan
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Select the plan that best fits your career development needs
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 dark:bg-slate-700 p-1 rounded-lg">
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <Badge text="Save 20%" className="ml-2 bg-green-100 text-green-800" />
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-slate-800 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectedPlan === plan.id
                  ? `border-${plan.color}-500 shadow-lg scale-105`
                  : "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
              } ${plan.popular ? "ring-2 ring-primary-500 ring-opacity-50" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge text="Most Popular" className="bg-primary-500 text-white px-3 py-1" />
                </div>
              )}

              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">
                      {getPlanPrice(plan)}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">
                      {getPlanPeriod(plan)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">
                      Features included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Icon
                            icon="heroicons:check"
                            className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                          />
                          <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-3">
                        Limitations:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Icon
                              icon="heroicons:x-mark"
                              className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0"
                            />
                            <span className="text-slate-500 dark:text-slate-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Button
                    type="button"
                    text={selectedPlan === plan.id ? "Selected" : "Select Plan"}
                    className={`w-full ${
                      selectedPlan === plan.id
                        ? `btn-${plan.color}`
                        : "btn-outline-gray"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                    icon={selectedPlan === plan.id ? "heroicons:check" : undefined}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Comparison */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
          <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
            Why Choose Professional?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <Icon icon="heroicons:rocket-launch" className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h5 className="font-medium text-slate-700 dark:text-slate-300">Faster Results</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get priority visibility and faster responses from employers
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon icon="heroicons:chart-bar-square" className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h5 className="font-medium text-slate-700 dark:text-slate-300">Better Insights</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Advanced analytics to track your application success
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon icon="heroicons:user-group" className="w-6 h-6 text-primary-500 mt-1" />
              <div>
                <h5 className="font-medium text-slate-700 dark:text-slate-300">Expert Support</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Get help from career experts and priority customer support
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <Icon icon="heroicons:shield-check" className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
            30-Day Money Back Guarantee
          </h4>
          <p className="text-sm text-green-700 dark:text-green-300">
            Not satisfied? Get a full refund within 30 days, no questions asked.
          </p>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            text="Previous"
            className="btn-outline-dark"
            onClick={onPrevious}
            disabled={submitting}
          />
          <Button
            type="submit"
            text={submitting ? "Saving..." : "Continue to Summary"}
            className="btn-primary"
            disabled={submitting}
          />
        </div>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Step {currentStep} of {totalSteps}
        </div>
      </form>
    </div>
  );
};

export default Subscriptions;
