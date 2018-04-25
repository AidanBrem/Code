import tensorflow as tf

#hyperparam
training_iterations = 100
LEARNING_RATE = 0.01

#other param
FILE_ADDRESS = "C:/Users/ratno/Desktop/trainingdata/*"

#DEFINING ALL FUNCTIONS--------------------------------------------------------------------

#import X-training_data
def import_data(file_address):
	#Prepare a training queue
    filename_queue = tf.train.string_input_producer(
        tf.train.match_filenames_once(file_address)
        )
    reader = tf.WholeFileReader()
    _, content = reader.read(filename_queue)
    image = tf.image.decode_jpeg(content, channels=1)
    cropped_image = tf.image.resize_image_with_crop_or_pad(image, 3000, 3000)
    reduced_image = tf.image.resize_images(image, [100, 100])
    #average 30 pixel blocks into 1 to yeild 10000 pixels in total
    modified_image = tf.transpose(tf.reshape(reduced_image, [10000, 1]))
    #transposing blocks
    
    return modified_image

#import Y-training_data
def neural_network(image_address):
	#Weight net (or neural network). Pycharm does this aaaaaall for us
    Weight_net_1 = {'weights': tf.Variable(tf.random_normal(shape=(10000, 16))),
                    'bias': tf.Variable(tf.random_normal(shape=(1, 1)))}
    Weight_net_2 = {'weights': tf.Variable(tf.random_normal(shape=(16, 16))),
                    'bias': tf.Variable(tf.random_normal(shape=(1, 1)))}
    Weight_net_3 = {'weights': tf.Variable(tf.random_normal(shape=(16, 1))),
                    'bias': tf.Variable(tf.random_normal(shape=(1, 1)))}

    #Input Layer
    Layer_1 = import_data(image_address)
    
    #Hidden Layer 1 (AI does its thang)
    Layer_2 = tf.nn.relu(tf.matmul(Layer_1, Weight_net_1['weights']) +
                         Weight_net_1['bias'])

    #Hidden Layer 2
    Layer_3 = tf.nn.relu(tf.matmul(Layer_2, Weight_net_2['weights']) +
                         Weight_net_2['bias'])

    #output cell Value between 0 and 1
    Layer_4 = tf.nn.relu(tf.matmul(Layer_3, Weight_net_3['weights']) +
                         Weight_net_3['bias'])
	
    return Layer_4

#training network
def train_step_cor(correct_files_location, learning_rate):
    not_complete = 1
	#Tell the AI to miminize loss to optimize
    LOSS = tf.reduce_sum(1 - neural_network(correct_files_location))
    tf.train.AdamOptimizer(learning_rate).minimize(LOSS)
    import time, itertools, sys
    animation = ["|", "/", "-", "\\"]
    while not_complete:
        for c in itertools.cycle(['.', '..', '...', '..', '.']):
            sys.stdout.write('\rTraining network on HDimages ' + c)
            time.sleep(1)
        print("\n")
    

def train_step_wro(incorrect_files_location, learning_rate):
    LOSS = tf.reduce_sum(neural_network(incorrect_files_location))
    tf.train.AdamOptimizer(learning_rate). minimize(LOSS)

#RUN---------------------------------------------------------------------------------------

with tf.Session() as sess:
    print("Intializing Variables.")
    sess.run(tf.global_variables_initializer())

    for i in range(training_iterations):
        sess.run(train_step_cor(FILE_ADDRESS, LEARNING_RATE))

    print("Training completed.\nRunning prediction:")
    prediction = neural_network(input_data=import_data(input("Directory: "))) #Directory of image you want to see if hotdog. ONLY PUT ONE IMAGE
	#gives values between 0 and 1
    if prediction >= 0.5:
        print ("Hot Dog")
    else:
        print ("Not Hot Dog")


# the basic idea:
# reads a directory and imports one image
# modifies() the image that is taken
# sends it through the neural network
# trains the network
# then iterates through a new directory to invalid samples.
# can be used with any picture
#
#
