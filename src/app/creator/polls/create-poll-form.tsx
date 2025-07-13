"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createPoll } from "@/lib/actions/poll.action";
import { POLL_TYPES } from "@/lib/validators/poll.validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Plus,
  Settings,
  Trash2,
  Users,
  Vote,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Option, Poll } from "@prisma/client";

// Create a form input schema (what the user types)
const creatorFormInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  pollType: z.enum(POLL_TYPES),
  expectedVoters: z.string().min(1, "Expected voters is required"),
  options: z.array(z.string()).min(2, "At least 2 options are required"),
});

type CreatorFormInput = z.infer<typeof creatorFormInputSchema>;

export function CreatePollForm({
  defaultValues,
}: {
  defaultValues?: Poll & {
    Option: Option[];
  };
}) {
  const [step, setStep] = useState(1);
  const [newOption, setNewOption] = useState("");
  const router = useRouter();
  const form = useForm<CreatorFormInput>({
    resolver: zodResolver(creatorFormInputSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      expectedVoters: defaultValues?.expectedVoters?.toString() || "1",
      pollType: defaultValues?.pollType || "SINGLE_CHOICE",
      options: defaultValues?.Option.map((option) => option.name) || [],
    },
    mode: "onChange",
  });

  const {
    formState: { isValid },
  } = form;

  const handleNext = async () => {
    if (step === 1) {
      const isValidStep1 = await form.trigger([
        "title",
        "pollType",
        "expectedVoters",
      ]);
      if (isValidStep1) {
        setStep(2);
      }
    } else if (step === 2) {
      const isValidStep2 = await form.trigger(["options"]);
      if (isValidStep2) {
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: CreatorFormInput) => {
    const transformedData = {
      ...data,
      expectedVoters: parseInt(data.expectedVoters),
    };

    const {
      success,
      message,
      data: poll,
    } = await createPoll(transformedData, defaultValues?.id);
    if (success && poll) {
      toast.success(message);
      router.push(`/creator/polls/${poll.id}`);
    } else {
      toast.error(message);
    }
  };

  const addOption = () => {
    if (newOption.trim()) {
      const currentOptions = form.getValues("options");
      form.setValue("options", [...currentOptions, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options");
    form.setValue(
      "options",
      currentOptions.filter((_, i) => i !== index)
    );
  };

  const steps = [
    { id: 1, title: "Basic Info", description: "Tell us about your poll" },
    { id: 2, title: "Options", description: "Add your options" },
    { id: 3, title: "Review", description: "Review and create" },
  ];

  const formData = form.watch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="py-6 border-b bg-white/80 backdrop-blur-sm">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">VoteVibe</span>
            </div>
            <Badge variant="secondary" className="text-sm">
              Creator Dashboard
            </Badge>
          </div>
        </Container>
      </header>

      <Container>
        <div className="max-w-4xl mx-auto py-12">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome, Creator! 🎉
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to create your first poll? Let&apos;s get started with a few
              simple steps to set up your voting session.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((stepItem, index) => (
                <div key={stepItem.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step >= stepItem.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {step > stepItem.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">
                        {stepItem.id}
                      </span>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      {stepItem.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stepItem.description}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        step > stepItem.id ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Steps */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {step === 1 && "Poll Information"}
                {step === 2 && "Poll Options"}
                {step === 3 && "Review & Create"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Step 1: Basic Info */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poll Title *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Best Project of the Year"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell voters what this poll is about..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pollType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poll Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a poll type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {POLL_TYPES.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option.replace("_", " ")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="expectedVoters"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expected Number of Voters *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g., 100"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Options */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <FormLabel className="text-base font-medium">
                          Poll Options *
                        </FormLabel>
                        <p className="text-sm text-gray-600 mb-4">
                          Add at least 2 options for voters to choose from
                        </p>

                        <div className="space-y-3">
                          {formData.options.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...formData.options];
                                  newOptions[index] = e.target.value;
                                  form.setValue("options", newOptions);
                                }}
                                placeholder={`Option ${index + 1}`}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeOption(index)}
                                className="shrink-0"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <Input
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                            placeholder="Add new option..."
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addOption();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addOption}
                            disabled={!newOption.trim()}
                            className="shrink-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Poll Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Title:</span>{" "}
                            {formData.title}
                          </div>
                          <div>
                            <span className="font-medium">Type:</span>{" "}
                            {formData.pollType?.replace("_", " ")}
                          </div>
                          <div>
                            <span className="font-medium">
                              Expected Voters:
                            </span>{" "}
                            {formData.expectedVoters}
                          </div>
                          <div>
                            <span className="font-medium">Options:</span>{" "}
                            {formData.options.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">
                          What&apos;s Next?
                        </h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Set voting deadlines and rules</li>
                          <li>• Invite participants to vote</li>
                          <li>• Monitor real-time results</li>
                          <li>• Share results with your community</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={step === 1}
                    >
                      Back
                    </Button>

                    {step < 3 ? (
                      <Button
                        key="button-next"
                        type="button"
                        onClick={handleNext}
                        className="flex items-center"
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        key="button-submit"
                        type="submit"
                        className="flex items-center"
                        disabled={!isValid}
                      >
                        Create Poll
                        <Plus className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              What You&apos;ll Get
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Easy Management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Manage your polls, track participation, and view results in
                    real-time.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Flexible Scheduling
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Set custom voting periods and deadlines that work for your
                    organization.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Advanced Options
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Configure voting rules, anonymity settings, and result
                    visibility.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
